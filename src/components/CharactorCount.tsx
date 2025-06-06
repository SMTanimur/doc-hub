/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Editor } from '@tiptap/core';
import React, { useMemo } from 'react';

interface IPropsCharactorCount {
  editor: Editor;
  extensions: any;
}

function CharactorCount({ editor, extensions }: IPropsCharactorCount) {
  const limit = useMemo(() => {
    return extensions?.find((extension: any) => extension.name === 'base-kit')
      ?.options?.characterCount?.limit;
  }, [extensions]);

  if (!limit) {
    return (
      <div className='flex items-center justify-between p-3 border-t'>
        <div className='flex flex-col'>
          <div className='flex justify-end gap-3 text-sm'>
            <span>
              {(editor as any).storage.characterCount.characters()} Characters
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-between p-3 border-t'>
      <div className='flex flex-col'>
        <div className='flex justify-end gap-3 text-sm'>
          <span>
            {editor.storage.characterCount.characters()}/{limit} Characters
          </span>
        </div>
      </div>
    </div>
  );
}

export default CharactorCount;
