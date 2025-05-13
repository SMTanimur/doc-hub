'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';

import type { Editor } from '@tiptap/core';

import { ActionButton } from '@/components'; // Assuming ActionButton is a reusable component

export interface ImportDocumentButtonProps {
  editor: Editor;
  disabled?: boolean;
  icon?: string;
  tooltip?: string;
  // Removed action, convert, limit, mammothOptions as conversion moves to backend
}

function ImportDocumentButton(props: ImportDocumentButtonProps) {
  const {
    editor,
    disabled,
    icon = 'FileText',
    tooltip = 'Import Document',
  } = props;
  const [loading, setLoading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  function triggerFileInput() {
    fileInput.current?.click();
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    // Optional: Add file size limit check here if needed
    // if (file.size > SOME_LIMIT) { ... }

    await uploadAndConvertFile(file);

    // Reset file input value to allow importing the same file again
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  }

  async function uploadAndConvertFile(file: File) {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/import-document', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: 'Failed to import document' }));
        console.error('Import Error:', errorData.message);
        // TODO: Show user-friendly error (e.g., using a toast notification)
        alert(
          `Error importing file: ${errorData.message || response.statusText}`
        );
        return;
      }

      const result = await response.json();
      if (result.html) {
        handleResult(result.html);
      } else {
        console.error('Import Error:', 'No HTML content received from API');
        alert('Error importing file: No content received.');
      }
    } catch (error: any) {
      console.error('Import failed:', error);
      alert(`Import failed: ${error.message || 'Unknown error'}`);
      // TODO: Show user-friendly error
    } finally {
      setLoading(false);
    }
  }

  function handleResult(htmlResult: string) {
    // Insert the HTML content received from the API
    // The `true` argument parses the HTML string
    editor.chain().focus().setContent(htmlResult, true).run();
  }

  return (
    <div>
      <ActionButton
        action={triggerFileInput}
        disabled={disabled || loading}
        icon={icon}
        loading={loading}
        tooltip={tooltip}
      />
      <input
        type='file'
        accept='.docx,.doc,.pdf,.xlsx,.pptx,.txt,.md' // Updated accepted types
        ref={fileInput}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default ImportDocumentButton;
