import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limit: 3 uploads per 10 minutes per IP (use multiple headers for accuracy)
  const ip = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const { success } = rateLimit(`resume:${ip}`, 3, 10 * 60 * 1000);
  if (!success) {
    return NextResponse.json({ error: 'Too many uploads. Please try again later.' }, { status: 429 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Accept PDF, DOC, DOCX
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const allowedExtensions = /\.(pdf|doc|docx)$/i;
    if (!allowedTypes.includes(file.type) && !allowedExtensions.test(file.name)) {
      return NextResponse.json(
        { error: 'Only PDF, DOC, or DOCX files are accepted.' },
        { status: 400 }
      );
    }

    // Max 5MB (matching frontend limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate file magic bytes (header signature)
    const header = buffer.subarray(0, 8);
    const isPdf = header[0] === 0x25 && header[1] === 0x50 && header[2] === 0x44 && header[3] === 0x46; // %PDF
    const isDoc = header[0] === 0xD0 && header[1] === 0xCF && header[2] === 0x11 && header[3] === 0xE0; // DOC (OLE2)
    const isDocx = header[0] === 0x50 && header[1] === 0x4B && header[2] === 0x03 && header[3] === 0x04; // DOCX (ZIP/PK)
    if (!isPdf && !isDoc && !isDocx) {
      return NextResponse.json(
        { error: 'Invalid file content. The file does not appear to be a valid document.' },
        { status: 400 }
      );
    }

    // Generate unique public_id
    const timestamp = Date.now();
    const safeName = file.name
      .replace(/\.(pdf|doc|docx)$/i, '')
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
      { error: 'Failed to upload resume. Please try again.' },
      { status: 500 }
    );
  }
}
