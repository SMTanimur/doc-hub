/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UnderlineOptions as TiptapUnderlineOptions } from '@tiptap/extension-underline';
import TiptapUnderline from '@tiptap/extension-underline';

import { ActionButton } from '@/components';
import type { GeneralOptions } from '@/types';

export interface UnderlineOptions
  extends TiptapUnderlineOptions,
  GeneralOptions<UnderlineOptions> {}

export const TextUnderline = /* @__PURE__ */ TiptapUnderline.extend<UnderlineOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }: any) {
        return {
          component: ActionButton,
          componentProps: {
            action: () => editor.commands.toggleUnderline(),
            isActive: () => editor.isActive('underline') || false,
            disabled: false,
            icon: 'Underline',
            shortcutKeys: ['mod', 'U'],
            tooltip: "Underline",
          },
        };
      },
    };
  },
});
