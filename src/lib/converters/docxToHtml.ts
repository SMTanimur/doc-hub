import mammoth from 'mammoth';

// Style mapping for better DOCX to HTML conversion
const styleMap = `
p[style-name='Heading 1'] => h1.heading-1
p[style-name='Heading 2'] => h2.heading-2
p[style-name='Heading 3'] => h3.heading-3
p[style-name='Normal'] => p.normal
r[style-name='Strong'] => strong
r[style-name='Emphasis'] => em
p[style-name='List Paragraph'] => p.list-paragraph
p[style-name='Quote'] => blockquote.quote
table => table.table
tr => tr.table-row
td => td.table-cell
th => th.table-header
`;

export async function docxToHtml(
  fileBuffer: Buffer
): Promise<{ html: string; error?: string }> {
  try {
    // Convert DOCX to HTML with style mapping
    const result = await mammoth.convertToHtml(
      { buffer: fileBuffer },
      { styleMap }
    );

    // Get the HTML content
    const html = result.value;

    // Get any warnings
    const warnings = result.messages
      .filter(message => message.type === 'warning')
      .map(message => message.message);

    // If there are warnings, log them
    if (warnings.length > 0) {
      console.warn('DOCX conversion warnings:', warnings);
    }

    return { html };
  } catch (error) {
    console.error('Error converting DOCX to HTML:', error);
    return {
      html: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
