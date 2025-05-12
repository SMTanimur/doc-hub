/* eslint-disable @typescript-eslint/no-explicit-any */
import { Extension } from '@tiptap/core';

import { ActionButton } from '@/components';
import { printEditorContent } from '@/utils/pdf';

export const ExportPdf = /* @__PURE__ */ Extension.create<any>({
  name: 'exportPdf',
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }: any) => ({
        component: ActionButton,
        componentProps: {
          action: () => {
            printEditorContent(editor);
          },
          icon: 'ExportPdf',
          tooltip: t('editor.exportPdf.tooltip'),
          isActive: () => false,
          disabled: false,
        },
      }),
    };
  },
});
