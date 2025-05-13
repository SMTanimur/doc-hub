/**
 * Converts a plain text file buffer to basic HTML (wrapping lines in <p> tags).
 * @param buffer The buffer containing the TXT file data.
 * @returns A promise that resolves with the HTML string.
 */
export async function convertTxtToHtml(buffer: Buffer): Promise<string> {
  try {
    const text = buffer.toString('utf-8');
    // Split by newline, filter empty lines, wrap non-empty lines in <p>, join back.
    const html = text
      .split(/\r?\n/)
      .filter(line => line.trim() !== '')
      .map(line => `<p>${line.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`) // Basic HTML escaping
      .join('\n');
    return html;
  } catch (error: unknown) {
    console.error('TXT to HTML conversion failed:', error);
    throw new Error(
      `Failed to convert TXT: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}
