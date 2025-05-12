import { NextRequest, NextResponse } from 'next/server';
import { docxToHtml } from '@/lib/converters/docxToHtml';

// Disable Next.js body parsing to use FormData directly for file uploads.
// For App Router, this is typically handled by default when accessing `req.formData()`.
// If issues arise, ensure your Next.js version handles this correctly or explore
// middleware for more complex scenarios.

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Determine file type and convert accordingly
    const fileType = file.type || file.name.split('.').pop()?.toLowerCase();

    let result;
    switch (fileType) {
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/msword':
      case 'docx':
      case 'doc':
        result = await docxToHtml(buffer);
        break;
      // Add more cases for other file types here
      default:
        return NextResponse.json(
          { error: 'Unsupported file type' },
          { status: 400 }
        );
    }

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ html: result.html });
  } catch (error) {
    console.error('Error processing file upload:', error);
    return NextResponse.json(
      { error: 'Error processing file upload' },
      { status: 500 }
    );
  }
}

// Configure the API route to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};
