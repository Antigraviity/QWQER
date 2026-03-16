'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { State } from '@/lib/definitions';
import bcrypt from 'bcryptjs';

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

export async function submitEnquiry(prevState: State, formData: FormData): Promise<State> {
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
        await db.enquiry.create({
            data: {
                name,
                email,
                phone,
                message,
            },
        });
    } catch (error) {
        return {
            message: 'Database Error: Failed to Submit Enquiry.',
        };
    }

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
    } catch (error) {
        return { message: 'Database Error: Failed to Submit Application.' };
    }

    return { message: 'Application submitted successfully! We will get back to you soon.' };
}
