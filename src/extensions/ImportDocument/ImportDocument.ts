import { Extension, Editor } from '@tiptap/core';
import React from 'react'; // Import React for ComponentType

import { ImportDocumentButton, ImportDocumentButtonProps } from './components'; // Import props type

/** Type for the configuration object returned by the button option */
export interface ImportDocumentButtonConfig {
  component: React.ComponentType<ImportDocumentButtonProps>;
  componentProps: ImportDocumentButtonProps;
}

/**
 * Represents the options for the ImportDocument extension.
 */
export interface ImportDocumentOptions {
  /** Component to be rendered */
  button: (props: { editor: Editor }) => ImportDocumentButtonConfig;
}

/**
 * Tiptap extension to provide a button for importing various document types.
 */
export const ImportDocument = Extension.create<ImportDocumentOptions>({
  name: 'importDocument',

  addOptions() {
    return {
      button: ({ editor }) => {
        return {
          component: ImportDocumentButton,
          componentProps: {
            editor,
            disabled: !editor.can().chain().focus().clearContent().run(),
            icon: 'ImportDocument',
            tooltip: 'Import Document',
          },
        };
      },
    };
  },

  // Keep other potential methods like addCommands, addStorage, etc.,
  // if they existed in ImportWord.ts, adapting as necessary.
  // For now, assuming a simple structure based on the likely purpose.
});
