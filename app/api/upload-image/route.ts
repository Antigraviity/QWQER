import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  // Require admin authentication
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Only accept webp format
    if (file.type !== 'image/webp') {
      return NextResponse.json(
        { error: 'Only .webp format is accepted. Please convert your image to WebP before uploading.' },
        { status: 400 }
      );
    }

    // Max 500KB
    if (file.size > 500 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 500KB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Use slug for filename, fallback to original name
    const slug = (formData.get('slug') as string) || '';
    const baseName = slug || file.name.replace(/\.webp$/i, '');
    const safeName = baseName
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const publicId = safeName;

    const result = await uploadToCloudinary(buffer, 'blog', publicId);

    return NextResponse.json({
      success: true,
      imageUrl: result.secure_url,
      filename: file.name,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image: ' + error.message },
      { status: 500 }
    );
  }
}
