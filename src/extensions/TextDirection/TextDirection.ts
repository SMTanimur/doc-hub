/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Extension } from '@tiptap/core';

import TextDirectionButton from '@/extensions/TextDirection/components/TextDirectionButton';

const TextDirection = /* @__PURE__ */ Extension.create({
  name: 'text-direction',
  addOptions() {
    return {
      ...this.parent?.(),
      types: ['heading', 'paragraph'],
      directions: ['auto', 'ltr', 'rtl'],
      defaultDirection: 'auto',
      button({
        editor,
        extension,
      
      }: {
        editor: any
        extension: Extension
  
      }) {
        const directions = (extension.options?.directions as any[]) || [];

        const iconMap = {
          auto: 'TextDirection',
          ltr: 'LeftToRight',
          rtl: 'RightToLeft',
        } as any;

        const items = directions.map(k => ({
          title: `editor.textDirection.${k}.tooltip`,
          icon: iconMap[k],
          isActive: () => false,
          action: () => {
            if (k === 'auto') {
              editor.commands?.unsetTextDirection?.();
              return;
            }

            editor.commands?.setTextDirection?.(k);
          },
          disabled: false,
        }));
        const disabled = items.filter(k => k.disabled).length === items.length;

        return {
          component: TextDirectionButton,
          componentProps: {
            icon: 'TextDirection',
            tooltip: "Text Direction",
            disabled,
            items,
          },
        };
      },
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          dir: {
            default: this.options.defaultDirection,
            parseHTML: (element: any) => {
              if (element.attributes.dir && this.options.directions.includes(element.attributes.dir)) {
                return element.attributes.dir.value;
              } else {
                return this.options.defaultDirection;
              }
            },
            renderHTML: (attributes) => {
              return { dir: attributes.dir };
            },
          },
        },
      },
    ];
  },
  // @ts-expect-error
  addCommands() {
    return {
      setTextDirection: (direction: any) => ({ commands }: any) => {
        if (!this.options.directions.includes(direction)) {
          return false;
        }
        return this.options.types.every((type: any) => commands.updateAttributes(type, { dir: direction }));
      },
      unsetTextDirection: () => ({ commands }: any) => {
        return this.options.types.every((type: any) => commands.resetAttributes(type, 'dir'));
      },
    };
  },
});

export { TextDirection };
