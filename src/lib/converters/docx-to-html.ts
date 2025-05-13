import mammoth from 'mammoth';

/**
 * Converts a DOCX file buffer to HTML using Mammoth.
 * @param buffer The buffer containing the DOCX file data.
 * @returns A promise that resolves with the HTML string.
 */
export async function convertDocxToHtml(buffer: Buffer): Promise<string> {
  try {
    // TODO: Add mammoth options if needed (e.g., for image handling, style maps)
    const result = await mammoth.convertToHtml({ buffer });
    // result.messages can contain warnings/errors from conversion
    if (result.messages && result.messages.length > 0) {
      console.warn('Mammoth conversion messages:', result.messages);
    }
    return result.value; // The generated HTML
  } catch (error: unknown) {
    console.error('DOCX to HTML conversion failed:', error);
    throw new Error(
      `Failed to convert DOCX: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}
