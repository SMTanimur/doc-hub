/* eslint-disable @typescript-eslint/no-explicit-any */
import { Extension } from '@tiptap/core';

import { ActionButton } from '@/components';
import { printEditorContent } from '@/utils/pdf';

export const ExportPdf = /* @__PURE__ */ Extension.create<any>({
  name: 'exportPdf',
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor}: any) => ({
        component: ActionButton,
        componentProps: {
          action: () => {
            printEditorContent(editor);
          },
          icon: 'ExportPdf',
          tooltip: 'Export PDF',
          isActive: () => false,
          disabled: false,
        },
      }),
    };
  },
});
