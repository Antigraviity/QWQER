// This route has been used and is now disabled. Safe to delete this folder.
import { NextResponse } from 'next/server';
export async function GET() {
    return NextResponse.json({ error: 'This route has been disabled.' }, { status: 410 });
}
