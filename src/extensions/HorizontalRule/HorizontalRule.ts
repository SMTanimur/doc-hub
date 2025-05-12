import { mergeAttributes } from '@tiptap/core';
import type { HorizontalRuleOptions as TiptapHorizontalRuleOptions } from '@tiptap/extension-horizontal-rule';
import { HorizontalRule as TiptapHorizontalRule } from '@tiptap/extension-horizontal-rule';

import { ActionButton } from '@/components';
import type { GeneralOptions } from '@/types';

export interface HorizontalRuleOptions
  extends TiptapHorizontalRuleOptions,
  GeneralOptions<HorizontalRuleOptions> {}

export const HorizontalRule = /* @__PURE__ */ TiptapHorizontalRule.extend<HorizontalRuleOptions>({
  renderHTML() {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, {
        'data-type': this.name,
      }),
      ['hr'],
    ];
  },
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.setHorizontalRule(),
          disabled: !editor.can().setHorizontalRule(),
          icon: 'Minus',
          shortcutKeys: ['mod', 'alt', 'S'],
          tooltip: "Horizontal Rule",
        },
      }),
    };
  },
  addKeyboardShortcuts() {
    return {
      'Mod-Alt-s': () => this.editor.commands.setHorizontalRule(),
    };
  },
});
