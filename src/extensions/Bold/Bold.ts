import type { BoldOptions as TiptapImageOptions } from '@tiptap/extension-bold';
import { Bold as TiptapBold } from '@tiptap/extension-bold';

import { ActionButton } from '@/components';
import type { GeneralOptions } from '@/types';

export interface BoldOptions extends TiptapImageOptions, GeneralOptions<BoldOptions> {}

export const Bold = /* @__PURE__ */ TiptapBold.extend<BoldOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      button: ({ editor}: any) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleBold(),
          isActive: () => editor.isActive('bold') || false,
          disabled: false,
          icon: 'Bold',
          shortcutKeys: ['mod', 'B'],
          tooltip: "Bold",
        },
      }),
    };
  },
});
