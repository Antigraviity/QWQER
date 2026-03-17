'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { State } from '@/lib/definitions';
import bcrypt from 'bcryptjs';
import { sendEnquiryNotification, sendJobApplicationNotification } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

const PostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    excerpt: z.string().optional(),
    content: z.string().min(1, 'Content is required'),
    image: z.string().optional().or(z.literal('')),
    readTime: z.string().optional(),
    date: z.string().optional(),
});

const CreatePost = PostSchema;

export async function createPost(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = CreatePost.safeParse({
        title: formData.get('title'),
        slug: formData.get('slug'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        image: formData.get('image'),
        readTime: formData.get('readTime'),
        date: formData.get('date'),
    });


    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Post.',
        };
    }

    const { title, slug, excerpt, content, image, readTime, date } = validatedFields.data;

    try {
        await db.post.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                image,
                readTime: readTime || '5 min read',
                date: date
                    ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                published: true,
            },
        });
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Post.',
        };
    }

    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    redirect('/admin/blog');
}

export async function updatePost(id: string, prevState: State, formData: FormData): Promise<State> {
    const validatedFields = PostSchema.safeParse({
        title: formData.get('title'),
        slug: formData.get('slug'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        image: formData.get('image'),
        readTime: formData.get('readTime'),
        date: formData.get('date'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Post.',
        };
    }

    const { title, slug, excerpt, content, image, readTime, date } = validatedFields.data;

    try {
        await db.post.update({
            where: { id },
            data: {
                title,
                slug,
                excerpt,
                content,
                image,
                readTime: readTime || '5 min read',
                date: date
                    ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                    : undefined,
            },
        });
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Post.',
        };
    }

    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    revalidatePath(`/post/${slug}`);
    redirect('/admin/blog');
}

export async function deletePost(id: string) {
    try {
        await db.post.delete({
            where: { id },
        });
        revalidatePath('/blog');
        revalidatePath('/admin/blog');
    } catch (error) {
        console.error('Database Error: Failed to Delete Post.', error);
        throw new Error('Failed to delete post');
    }
}

// Enquiry Actions
const EnquirySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    message: z.string().min(1, 'Message is required'),
});

export async function markEnquiryRead(id: string) {
    try {
        await db.enquiry.update({
            where: { id },
            data: { status: 'READ' },
        });
        revalidatePath('/admin/enquiries');
        revalidatePath('/admin');
    } catch (error) {
        console.error('Failed to mark enquiry as read:', error);
    }
}

export async function submitEnquiry(prevState: State, formData: FormData): Promise<State> {
    // Rate limit: 5 enquiries per 10 minutes per email
    const email = formData.get('email') as string;
    if (email) {
        const { success } = rateLimit(`enquiry:${email}`, 5, 10 * 60 * 1000);
        if (!success) {
            return { message: 'Too many submissions. Please try again later.' };
        }
    }

    const validatedFields = EnquirySchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Submit Enquiry.',
        };
    }

    const { name, email, phone, message } = validatedFields.data;

    try {
        // Save to database
        await db.enquiry.create({
            data: {
                name,
                email,
                phone,
                message,
            },
        });

        // Send email notification (non-blocking)
        sendEnquiryNotification({ name, email, phone, message }).catch((err) => {
            console.error('Email notification failed:', err);
        });
    } catch (error) {
        return {
            message: 'Database Error: Failed to Submit Enquiry.',
        };
    }

    revalidatePath('/admin/enquiries');
    return { message: 'Enquiry Submitted Successfully!' };
}

// User Actions
const UserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function createUser(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = UserSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create User.',
        };
    }

    const { name, email, password } = validatedFields.data;

    try {
        // Check if email already exists
        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            return { message: 'Email already exists.' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'ADMIN',
            },
        });
    } catch (error) {
        return { message: 'Database Error: Failed to Create User.' };
    }

    revalidatePath('/admin/users');
    return { message: 'success' };
}

export async function updateAdminProfile(prevState: State, formData: FormData): Promise<State> {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const newEmail = formData.get('email') as string;

    if (!id || !name || !newEmail) {
        return { message: 'Name and email are required.' };
    }

    try {
        // Check if email is already taken by another user
        const existing = await db.user.findUnique({ where: { email: newEmail } });
        if (existing && existing.id !== id) {
            return { message: 'This email is already in use by another account.' };
        }

        await db.user.update({
            where: { id },
            data: { name, email: newEmail },
        });
    } catch (error) {
        return { message: 'Database Error: Failed to update profile.' };
    }

    return { message: 'Profile updated successfully!' };
}

export async function changePassword(prevState: State, formData: FormData): Promise<State> {
    const email = formData.get('email') as string;
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!email || !currentPassword || !newPassword || !confirmPassword) {
        return { message: 'All fields are required.' };
    }

    if (newPassword.length < 6) {
        return { message: 'New password must be at least 6 characters.' };
    }

    if (newPassword !== confirmPassword) {
        return { message: 'New passwords do not match.' };
    }

    try {
        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
            return { message: 'User not found.' };
        }

        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) {
            return { message: 'Current password is incorrect.' };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.user.update({
            where: { email },
            data: { password: hashedPassword },
        });
    } catch (error) {
        return { message: 'Database Error: Failed to change password.' };
    }

    return { message: 'Password changed successfully!' };
}

export async function revokeUser(id: string) {
    try {
        await db.user.delete({
            where: { id },
        });
        revalidatePath('/admin/users');
    } catch (error) {
        console.error('Database Error: Failed to Revoke User.', error);
        throw new Error('Failed to revoke user access');
    }
}

// Career Actions
const CareerSchema = z.object({
    title: z.string().min(1, 'Job title is required'),
    slug: z.string().min(1, 'Slug is required'),
    department: z.string().min(1, 'Department is required'),
    location: z.string().min(1, 'Location is required'),
    type: z.string().min(1, 'Job type is required'),
    experience: z.string().optional(),
    description: z.string().min(1, 'Description is required'),
});

export async function createCareer(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = CareerSchema.safeParse({
        title: formData.get('title'),
        slug: formData.get('slug'),
        department: formData.get('department'),
        location: formData.get('location'),
        type: formData.get('type'),
        experience: formData.get('experience'),
        description: formData.get('description'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Career.',
        };
    }

    const { title, slug, department, location, type, experience, description } = validatedFields.data;

    try {
        await db.career.create({
            data: {
                title,
                slug,
                department,
                location,
                type,
                experience: experience || null,
                description,
                published: true,
            },
        });
    } catch (error) {
        return { message: 'Database Error: Failed to Create Career.' };
    }

    revalidatePath('/careers');
    revalidatePath('/admin/careers');
    redirect('/admin/careers');
}

export async function updateCareer(id: string, prevState: State, formData: FormData): Promise<State> {
    const validatedFields = CareerSchema.safeParse({
        title: formData.get('title'),
        slug: formData.get('slug'),
        department: formData.get('department'),
        location: formData.get('location'),
        type: formData.get('type'),
        experience: formData.get('experience'),
        description: formData.get('description'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Career.',
        };
    }

    const { title, slug, department, location, type, experience, description } = validatedFields.data;

    try {
        await db.career.update({
            where: { id },
            data: {
                title,
                slug,
                department,
                location,
                type,
                experience: experience || null,
                description,
            },
        });
    } catch (error) {
        return { message: 'Database Error: Failed to Update Career.' };
    }

    revalidatePath('/careers');
    revalidatePath('/admin/careers');
    redirect('/admin/careers');
}

export async function updateCareerStatus(id: string, published: boolean) {
    try {
        await db.career.update({
            where: { id },
            data: { published },
        });
        revalidatePath('/careers');
        revalidatePath('/admin/careers');
    } catch (error) {
        console.error('Database Error: Failed to Update Career Status.', error);
        throw new Error('Failed to update career status');
    }
}

export async function deleteCareer(id: string) {
    try {
        await db.career.delete({ where: { id } });
        revalidatePath('/careers');
        revalidatePath('/admin/careers');
    } catch (error) {
        console.error('Database Error: Failed to Delete Career.', error);
        throw new Error('Failed to delete career');
    }
}

// Job Application Actions
const JobApplicationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    coverNote: z.string().optional(),
    careerTitle: z.string().min(1),
    careerSlug: z.string().min(1),
    resumeUrl: z.string().optional(),
});

export async function submitJobApplication(prevState: State, formData: FormData): Promise<State> {
    // Rate limit: 3 applications per 30 minutes per email
    const appEmail = formData.get('email') as string;
    if (appEmail) {
        const { success } = rateLimit(`job:${appEmail}`, 3, 30 * 60 * 1000);
        if (!success) {
            return { message: 'Too many submissions. Please try again later.' };
        }
    }

    const validatedFields = JobApplicationSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        coverNote: formData.get('coverNote'),
        careerTitle: formData.get('careerTitle'),
        careerSlug: formData.get('careerSlug'),
        resumeUrl: formData.get('resumeUrl'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Submit Application.',
        };
    }

    const { name, email, phone, coverNote, careerTitle, careerSlug, resumeUrl } = validatedFields.data;

    try {
        await db.jobApplication.create({
            data: { name, email, phone, coverNote, careerTitle, careerSlug, resumeUrl },
        });

        // Send email notifications (non-blocking)
        sendJobApplicationNotification({ name, email, phone, coverNote, careerTitle, resumeUrl }).catch((err) => {
            console.error('Job application email notification failed:', err);
        });
    } catch (error) {
        return { message: 'Database Error: Failed to Submit Application.' };
    }

    revalidatePath('/admin/careers');
    return { message: 'Application submitted successfully! We will get back to you soon.' };
}
