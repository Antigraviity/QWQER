// This route has been used and should be deleted.
// Keeping as placeholder to avoid build errors if referenced.
import { NextResponse } from 'next/server';
export async function GET() {
    return NextResponse.json({ error: 'This cleanup route has been disabled.' }, { status: 410 });
}
