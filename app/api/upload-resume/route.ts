import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limit: 5 uploads per 10 minutes per IP
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { success } = rateLimit(`resume:${ip}`, 5, 10 * 60 * 1000);
  if (!success) {
    return NextResponse.json({ error: 'Too many uploads. Please try again later.' }, { status: 429 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Only accept PDF
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF format is accepted.' },
        { status: 400 }
      );
    }

    // Max 2MB
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 2MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique public_id
    const timestamp = Date.now();
    const safeName = file.name
      .replace(/\.pdf$/i, '')
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const publicId = `${safeName}-${timestamp}`;

    const result = await uploadToCloudinary(buffer, 'resumes', publicId);

    return NextResponse.json({
      success: true,
      resumeUrl: result.secure_url,
      filename: file.name,
    });
  } catch (error: any) {
    console.error('Resume upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload resume: ' + error.message },
      { status: 500 }
    );
  }
}
