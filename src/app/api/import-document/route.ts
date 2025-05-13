import { NextRequest, NextResponse } from 'next/server';
import { convertDocxToHtml } from '@/lib/converters/docx-to-html';
import { convertMdToHtml } from '@/lib/converters/md-to-html';
import { convertTxtToHtml } from '@/lib/converters/txt-to-html';
// Import other converters once they are created
// import { convertPdfToHtml } from '@/lib/converters/pdf-to-html';
// import { convertXlsxToHtml } from '@/lib/converters/xlsx-to-html';
// import { convertPptxToHtml } from '@/lib/converters/pptx-to-html';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { message: 'No file uploaded.' },
        { status: 400 }
      );
    }

    const fileName = file.name.toLowerCase();
    let html: string | null = null;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    if (fileName.endsWith('.docx')) {
      html = await convertDocxToHtml(fileBuffer);
    } else if (fileName.endsWith('.md')) {
      html = await convertMdToHtml(fileBuffer);
    } else if (fileName.endsWith('.txt')) {
      html = await convertTxtToHtml(fileBuffer);
    } else if (fileName.endsWith('.doc')) {
      // Placeholder for .doc conversion - often needs a specific library like antiword or libreoffice
      // html = await convertLegacyDocToHtml(fileBuffer);
      return NextResponse.json(
        { message: '.doc format not yet supported.' },
        { status: 501 }
      );
    } else if (fileName.endsWith('.pdf')) {
      // html = await convertPdfToHtml(fileBuffer);
      return NextResponse.json(
        { message: 'PDF format not yet supported.' },
        { status: 501 }
      );
    } else if (fileName.endsWith('.xlsx')) {
      // html = await convertXlsxToHtml(fileBuffer);
      return NextResponse.json(
        { message: 'XLSX format not yet supported.' },
        { status: 501 }
      );
    } else if (fileName.endsWith('.pptx')) {
      // html = await convertPptxToHtml(fileBuffer);
      return NextResponse.json(
        { message: 'PPTX format not yet supported.' },
        { status: 501 }
      );
    } else {
      return NextResponse.json(
        { message: 'Unsupported file type.' },
        { status: 415 }
      );
    }

    if (html === null) {
      return NextResponse.json(
        { message: 'File conversion failed.' },
        { status: 500 }
      );
    }

    // It's crucial to sanitize HTML here before sending to client to prevent XSS
    // const sanitizedHtml = sanitizeHtml(html, { /* options */ });
    // For now, sending raw HTML, but sanitization is a MUST for production.
    return NextResponse.json({ html: html });
  } catch (error: unknown) {
    console.error('API Import Error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'An error occurred during file import.', error: errorMessage },
      { status: 500 }
    );
  }
}
