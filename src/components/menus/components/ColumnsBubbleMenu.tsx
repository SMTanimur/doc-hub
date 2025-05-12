'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';

import { BubbleMenu } from '@tiptap/react';

import { ActionButton } from '@/components';
import { MultiColumn } from '@/extensions/MultiColumn';

import { deleteNode } from '@/utils/delete-node';

export function ColumnsBubbleMenu({ editor }: any) {
  const shouldShow = useCallback(
    () => editor.isActive(MultiColumn.name),
    [editor]
  );
  const deleteMe = useCallback(
    () => deleteNode(MultiColumn.name, editor),
    [editor]
  );
  const addColBefore = useCallback(
    () => editor.chain().focus().addColBefore().run(),
    [editor]
  );
  const addColAfter = useCallback(
    () => editor.chain().focus().addColAfter().run(),
    [editor]
  );
  const deleteCol = useCallback(
    () => editor.chain().focus().deleteCol().run(),
    [editor]
  );

  return (
    <BubbleMenu
      editor={editor}
      pluginKey='columns-bubble-menu'
      shouldShow={shouldShow}
      tippyOptions={{
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        placement: 'bottom-start',
        offset: [-2, 16],
        zIndex: 9999,
        // onHidden: () => {
        //   toggleVisible(false)
        // },
      }}
    >
      <div className='pointer-events-auto w-auto select-none rounded-sm !border border-neutral-200 bg-background px-3 py-2 shadow-sm transition-all dark:border-neutral-800'>
        <ActionButton
          action={addColBefore}
          icon='ColumnAddLeft'
          tooltip='Insert Column Before'
        />

        <ActionButton
          action={addColAfter}
          icon='ColumnAddRight'
          tooltip='Insert Column After'
        />

        <ActionButton
          action={deleteCol}
          icon='DeleteColumn'
          tooltip='Delete Column'
        />

        <ActionButton action={deleteMe} icon='Trash2' tooltip='Delete Column' />
      </div>
    </BubbleMenu>
  );
}
