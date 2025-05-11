import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';
// @ts-expect-error If pdf-parse types are not resolved
import pdf from 'pdf-parse';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const formData = await req.formData();
    const fileEntry = formData.get('file');

    if (!fileEntry || !(fileEntry instanceof Blob)) {
      return NextResponse.json(
        { error: 'No file uploaded or invalid file format.' },
        { status: 400 }
      );
    }

    const uploadedFile = fileEntry as File;

    let htmlContent = '';
    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
    const fileName = uploadedFile.name.toLowerCase();

    if (fileName.endsWith('.txt')) {
      htmlContent = `<pre>${fileBuffer.toString('utf-8')}</pre>`;
    } else if (fileName.endsWith('.docx')) {
      try {
        const result = await mammoth.convertToHtml({ buffer: fileBuffer });
        htmlContent = result.value;
      } catch (e: unknown) {
        console.error('DOCX conversion error:', e);
        const message =
          e instanceof Error ? e.message : 'Unknown DOCX conversion error';
        return NextResponse.json(
          { error: 'Failed to convert DOCX file.', details: message },
          { status: 500 }
        );
      }
    } else if (fileName.endsWith('.pdf')) {
      try {
        const data = await pdf(fileBuffer);
        htmlContent = data.text
          .split('\n\n')
          .map((p: string) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
          .join('');
      } catch (e: unknown) {
        console.error('PDF conversion error:', e);
        const message =
          e instanceof Error ? e.message : 'Unknown PDF conversion error';
        return NextResponse.json(
          { error: 'Failed to parse PDF file.', details: message },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Unsupported file type.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ html: htmlContent });
  } catch (error: unknown) {
    console.error('API error in convertToStyledHtml:', error);
    const message =
      error instanceof Error ? error.message : 'Unknown server error';
    return NextResponse.json(
      { error: 'Internal server error.', details: message },
      { status: 500 }
    );
  }
}
