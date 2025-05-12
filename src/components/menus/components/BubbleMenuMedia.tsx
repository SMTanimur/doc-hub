/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Fragment, useMemo } from 'react';

import type { Editor } from '@tiptap/react';
import { BubbleMenu as BubbleMenuReact } from '@tiptap/react';

import { Separator } from '@/components';
import { Image } from '@/extensions/Image';

import { Video } from '@/extensions/Video';
import { getBubbleImage, getBubbleVideo } from '../bubble';

interface IPropsBubbleMenu {
  editor: Editor;
  disabled?: boolean;
}

const tippyOptions = {
  maxWidth: 'auto',
  zIndex: 20,
  appendTo: 'parent',
  moveTransition: 'transform 0.1s ease-out',
};

function ItemA({ item, disabled, editor }: any) {
  const Comp = item.component;

  if (!Comp) {
    return <></>;
  }

  return (
    <Fragment>
      {item.type === 'divider' ? (
        <Separator className='!mx-1 !my-2 !h-[16px]' orientation='vertical' />
      ) : (
        <Comp
          {...item.componentProps}
          disabled={disabled || item?.componentProps?.disabled}
          editor={editor}
        />
      )}
    </Fragment>
  );
}

function isImageNode(node: any) {
  return node.type.name === Image.name;
}

function isVideoNode(node: any) {
  return node.type.name === Video.name;
}

function BubbleMenuImage(props: IPropsBubbleMenu) {
  const shouldShow = ({ editor }: any) => {
    const { selection } = editor.view.state;
    const { $from, to } = selection;
    let isImage = false;

    editor.view.state.doc.nodesBetween($from.pos, to, (node: any) => {
      if (isImageNode(node)) {
        isImage = true;
        return false; // Stop iteration if an image is found
      }
    });

    return isImage;
  };

  const items = useMemo(() => {
    if (props.disabled) {
      return [];
    }
    return getBubbleImage(props.editor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.disabled, props.editor]);

  return (
    <>
      <BubbleMenuReact
        editor={props?.editor}
        shouldShow={shouldShow}
        tippyOptions={tippyOptions as any}
      >
        {items?.length ? (
          <div className='pointer-events-auto w-auto select-none rounded-sm !border border-neutral-200 bg-background px-3 py-2 shadow-sm transition-all dark:border-neutral-800'>
            <div className='relative flex h-[26px] flex-nowrap items-center justify-start whitespace-nowrap'>
              {items?.map((item: any, key: any) => {
                return (
                  <ItemA
                    disabled={props.disabled}
                    editor={props.editor}
                    item={item}
                    key={`bubbleMenu-image-${key}`}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </BubbleMenuReact>
    </>
  );
}

function BubbleMenuVideo(props: IPropsBubbleMenu) {
  const shouldShow = ({ editor }: any) => {
    const { selection } = editor.view.state;
    const { $from, to } = selection;
    let isVideo = false;

    editor.view.state.doc.nodesBetween($from.pos, to, (node: any) => {
      if (isVideoNode(node)) {
        isVideo = true;
        return false;
      }
    });

    return isVideo;
  };

  const items = useMemo(() => {
    if (props.disabled) {
      return [];
    }

    return getBubbleVideo(props.editor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.editor, props.disabled]);

  return (
    <>
      <BubbleMenuReact
        editor={props?.editor}
        shouldShow={shouldShow}
        tippyOptions={tippyOptions as any}
      >
        {items?.length ? (
          <div className='pointer-events-auto w-auto select-none rounded-sm !border border-neutral-200 bg-background px-3 py-2 shadow-sm transition-all dark:border-neutral-800'>
            <div className='relative flex h-[26px] flex-nowrap items-center justify-start whitespace-nowrap'>
              {items?.map((item: any, key: any) => {
                return (
                  <ItemA
                    disabled={props.disabled}
                    editor={props.editor}
                    item={item}
                    key={`bubbleMenu-video-${key}`}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </BubbleMenuReact>
    </>
  );
}

export { BubbleMenuImage, BubbleMenuVideo };
