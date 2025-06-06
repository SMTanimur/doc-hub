/* eslint-disable @typescript-eslint/no-explicit-any */
import { Extension } from '@tiptap/core';

import { ActionButton } from '@/components';

export const ColumnActionButton = Extension.create<any>({
  name: 'columnActionButton',
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor}: any) => ({
        component: ActionButton,
        componentProps: {
          action: () => {
            editor.chain().focus().insertColumns({ cols: 2 }).run();
          },
          icon: 'Columns',
          tooltip: "Columns",
        },
      }),
    };
  },
});
