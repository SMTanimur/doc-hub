'use client';

import type { Editor } from '@tiptap/core';
import { isActive } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react';
import type { GetReferenceClientRect } from 'tippy.js';
import { sticky } from 'tippy.js';

import { ActionButton, type ActionButtonProps, Separator } from '@/components';
import HighlightActionButton from '@/extensions/Highlight/components/HighlightActionButton';

export interface TableBubbleMenuProps {
  editor: Editor;
  disabled?: boolean;
  actions?: ActionButtonProps[];
}

function TableBubbleMenu({ editor, disabled, actions }: TableBubbleMenuProps) {
  const shouldShow = ({ editor }: { editor: Editor }) => {
    return isActive(editor.view.state, 'table');
  };

  function onAddColumnBefore() {
    editor.chain().focus().addColumnBefore().run();
  }

  function onAddColumnAfter() {
    editor.chain().focus().addColumnAfter().run();
  }

  function onDeleteColumn() {
    editor.chain().focus().deleteColumn().run();
  }
  function onAddRowAbove() {
    editor.chain().focus().addRowBefore().run();
  }

  function onAddRowBelow() {
    editor.chain().focus().addRowAfter().run();
  }

  function onDeleteRow() {
    editor.chain().focus().deleteRow().run();
  }

  function onMergeCell() {
    editor.chain().focus().mergeCells().run();
  }
  function onSplitCell() {
    editor?.chain().focus().splitCell().run();
  }
  function onDeleteTable() {
    editor.chain().focus().deleteTable().run();
  }

  function onSetCellBackground(color: string) {
    editor.chain().focus().setTableCellBackground(color).run();
  }
  const getReferenceClientRect: GetReferenceClientRect = () => {
    const {
      view,
      state: {
        selection: { from },
      },
    } = editor;

    const node = view.domAtPos(from).node as HTMLElement;
    if (!node) {
      return new DOMRect(-1000, -1000, 0, 0);
    }

    const tableWrapper = node?.closest?.('.tableWrapper');
    if (!tableWrapper) {
      return new DOMRect(-1000, -1000, 0, 0);
    }

    const rect = tableWrapper.getBoundingClientRect();

    return rect;
  };

  return (
    <BubbleMenu
      editor={editor}
      pluginKey='table'
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        maxWidth: 'auto',
        getReferenceClientRect,
        plugins: [sticky],
        sticky: 'popper',
      }}
    >
      {disabled ? (
        <></>
      ) : (
        <div className='flex size-full min-w-32 flex-row items-center gap-0.5 rounded-lg !border border-border bg-background p-2 leading-none shadow-sm'>
          <ActionButton
            action={onAddColumnBefore}
            disabled={!editor?.can()?.addColumnBefore?.()}
            icon='BetweenHorizonalEnd'
            tooltip='Insert Column Before'
            tooltip-options={{
              sideOffset: 15,
            }}
          />

          <ActionButton
            action={onAddColumnAfter}
            disabled={!editor?.can()?.addColumnAfter?.()}
            icon='BetweenHorizonalStart'
            tooltip='Insert Column After'
            tooltip-options={{
              sideOffset: 15,
            }}
          />

          <ActionButton
            action={onDeleteColumn}
            disabled={!editor?.can().deleteColumn?.()}
            icon='DeleteColumn'
            tooltip='Delete Column'
            tooltip-options={{
              sideOffset: 15,
            }}
          />

          <Separator className='!mx-1 !my-2 !h-[16px]' orientation='vertical' />

          <ActionButton
            action={onAddRowAbove}
            disabled={!editor?.can().addRowBefore?.()}
            icon='BetweenVerticalEnd'
            tooltip='Insert Row Above'
            tooltip-options={{
              sideOffset: 15,
            }}
          />

          <ActionButton
            action={onAddRowBelow}
            disabled={!editor?.can()?.addRowAfter?.()}
            icon='BetweenVerticalStart'
            tooltip='Insert Row Below'
            tooltip-options={{
              sideOffset: 15,
            }}
          />

          <ActionButton
            action={onDeleteRow}
            disabled={!editor?.can()?.deleteRow?.()}
            icon='DeleteRow'
            tooltip='Delete Row'
            tooltip-options={{
              sideOffset: 15,
            }}
          />

          <Separator className='!mx-1 !my-2 !h-[16px]' orientation='vertical' />

          <ActionButton
            action={onMergeCell}
            disabled={!editor?.can()?.mergeCells?.()}
            icon='TableCellsMerge'
            tooltip='Merge Cells'
            tooltip-options={{
              sideOffset: 15,
            }}
          />

          <ActionButton
            action={onSplitCell}
            disabled={!editor?.can()?.splitCell?.()}
            icon='TableCellsSplit'
            tooltip='Split Cells'
            tooltip-options={{
              sideOffset: 15,
            }}
          />

          <Separator className='!mx-1 !my-2 !h-[16px]' orientation='vertical' />

          <HighlightActionButton
            action={onSetCellBackground}
            editor={editor}
            tooltip='Set Cells Background Color'
            tooltipOptions={{
              sideOffset: 15,
            }}
          />

          <ActionButton
            action={onDeleteTable}
            disabled={!editor?.can()?.deleteTable?.()}
            icon='Trash2'
            tooltip='Delete Table'
            tooltip-options={{
              sideOffset: 15,
            }}
          />

          {actions &&
            actions.map((item, i) => <ActionButton key={i} {...item} />)}
        </div>
      )}
    </BubbleMenu>
  );
}

export { TableBubbleMenu };
