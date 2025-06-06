/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';

import { NodeViewWrapper } from '@tiptap/react';
import clsx from 'clsx';
import { Resizable } from 're-resizable';

// import { getEditorContainerDOMSize } from '@/utils'
import { Button, Input } from '@/components/ui';
import { getServiceSrc } from '@/extensions/Iframe/embed';
import { Iframe } from '@/extensions/Iframe/Iframe';
import { useEditableEditor } from '@/stores';

import styles from './index.module.scss';

function IframeNodeView({ editor, node, updateAttributes }: any) {
  const isEditable = useEditableEditor();

  const { src, width, height } = node.attrs;
  // const { width: maxWidth } = getEditorContainerDOMSize(editor)

  const [originalLink, setOriginalLink] = useState<string>('');

  function handleConfirm() {
    if (!originalLink) {
      return;
    }

    const urlFormat = getServiceSrc(originalLink);

    editor
      .chain()
      .updateAttributes(Iframe.name, {
        src: urlFormat?.src || originalLink,
      })
      .setNodeSelection(editor.state.selection.from)
      .focus()
      .run();
  }

  const onResize = useCallback(
    (size: any) => {
      updateAttributes({ width: size.width, height: size.height });
    },
    [updateAttributes]
  );

  return (
    <NodeViewWrapper>
      {!src && (
        <div className='mx-auto my-[12px] flex max-w-[600px] items-center justify-center gap-[10px] rounded-[12px] border border-solid border-[#ccc] p-[10px]'>
          <Input
            autoFocus
            className='flex-1'
            onInput={(e: any) => setOriginalLink(e.target.value)}
            placeholder='Enter link'
            type='url'
            value={originalLink}
          />

          <Button className='w-[60px]' onClick={handleConfirm}>
            OK
          </Button>
        </div>
      )}

      {src && (
        <Resizable
          size={{
            width: Number.parseInt(width),
            height: Number.parseInt(height),
          }}
          onResizeStop={(e, direction, ref, d) => {
            onResize({
              width: Number.parseInt(width) + d.width,
              height: Number.parseInt(height) + d.height,
            });
          }}
        >
          <div className={clsx(styles.wrap, 'render-wrapper')}>
            <div
              className={styles.innerWrap}
              style={{ pointerEvents: !isEditable ? 'auto' : 'none' }}
            >
              <iframe className='my-[12px] ' src={src}></iframe>
            </div>
          </div>
        </Resizable>
      )}
    </NodeViewWrapper>
  );
}

export default IframeNodeView;
