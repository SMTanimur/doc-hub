import type { BlockquoteOptions as TiptapBlockquoteOptions } from '@tiptap/extension-blockquote';
import { Blockquote as TiptapBlockquote } from '@tiptap/extension-blockquote';

import { ActionButton } from '@/components';
import type { GeneralOptions } from '@/types';

export interface BlockquoteOptions
  extends TiptapBlockquoteOptions,
  GeneralOptions<BlockquoteOptions> {}

export const Blockquote = /* @__PURE__ */ TiptapBlockquote.extend<BlockquoteOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'blockquote',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      button: ({ editor }: any) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleBlockquote(),
          isActive: () => editor.isActive('blockquote') || false,
          disabled: !editor.can().toggleBlockquote(),
          icon: 'TextQuote',
          shortcutKeys: ['shift', 'mod', 'B'],
          tooltip: "Blockquote",
        },
      }),
    };
  },
});
