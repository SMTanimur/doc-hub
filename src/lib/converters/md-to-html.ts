import { marked } from 'marked';

/**
 * Converts a Markdown file buffer to HTML using Marked.
 * @param buffer The buffer containing the Markdown file data.
 * @returns A promise that resolves with the HTML string.
 */
export async function convertMdToHtml(buffer: Buffer): Promise<string> {
  try {
    const markdownString = buffer.toString('utf-8');
    // TODO: Configure marked options if needed (e.g., gfm, breaks, sanitize)
    // Note: Marked's sanitize option is deprecated; use a separate sanitizer like DOMPurify on the output.
    const html = await marked.parse(markdownString);
    if (typeof html !== 'string') {
      throw new Error('Markdown conversion did not return a string.');
    }
    return html;
  } catch (error: unknown) {
    console.error('MD to HTML conversion failed:', error);
    throw new Error(
      `Failed to convert Markdown: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}
