/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
} from 'react';

import type { AnyExtension, Editor as CoreEditor } from '@tiptap/core';
import type { UseEditorOptions } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import { throttle } from 'lodash-es';

import { BubbleMenu, Toolbar, TooltipProvider } from '@/components';

import { EDITOR_UPDATE_WATCH_THROTTLE_WAIT_TIME } from '@/constants';
import { RESET_CSS } from '@/constants/resetCSS';
import { editableEditorActions } from '@/stores';
import { ProviderRichText } from '@/stores';

import type { BubbleMenuProps, ToolbarProps } from '@/types';
import { removeCSS, updateCSS } from '@/utils/dynamicCSS';
import { hasExtension } from '@/utils/utils';
import CharactorCount from './CharactorCount';

/**
 * Interface for RichTextEditor component props
 */
export interface RichTextEditorProps {
  /** Content of the editor */
  content: string;
  /** Extensions for the editor */
  extensions: AnyExtension[];

  /** Output format */
  output: 'html' | 'json' | 'text';
  /** Model value */
  modelValue?: string | object;
  /** Dark mode flag */
  dark?: boolean;
  /** Dense mode flag */
  dense?: boolean;
  /** Disabled flag */
  disabled?: boolean;
  /** Label for the editor */
  label?: string;
  /** Hide toolbar flag */
  hideToolbar?: boolean;
  /** Disable bubble menu flag */
  disableBubble?: boolean;
  /** Hide bubble menu flag */
  hideBubble?: boolean;
  /** Remove default wrapper flag */
  removeDefaultWrapper?: boolean;
  /** Maximum width */
  maxWidth?: string | number;
  /** Minimum height */
  minHeight?: string | number;
  /** Maximum height */
  maxHeight?: string | number;
  /** Content class */
  contentClass?: string | string[] | Record<string, any>;
  /** Content change callback */
  onChangeContent?: (val: any) => void;
  /** Bubble menu props */
  bubbleMenu?: BubbleMenuProps;
  /** Toolbar props */
  toolbar?: ToolbarProps;

  /** Use editor options */
  useEditorOptions?: UseEditorOptions;

  /** Use editor options */
  resetCSS?: boolean;
}

function RichTextEditor(
  props: RichTextEditorProps,
  ref: React.ForwardedRef<{ editor: CoreEditor | null }>
) {
  const { content, extensions, useEditorOptions = {} } = props;

  const id = useId();

  const sortExtensions = useMemo(() => {
    // Directly map and attempt to configure each extension with the sort index
    return extensions.map((ext, i) => {
      // Basic check: Ensure ext is not null/undefined and has a configure method
      if (ext && typeof ext.configure === 'function') {
        try {
          // Assume configure merges options or handles the { sort: i } object.
          // Tiptap's configure usually returns a new configured instance.
          return ext.configure({ sort: i });
        } catch (error) {
          console.error(
            `Error configuring extension ${
              ext.name || 'unknown'
            } with sort index:`,
            error
          );
          // Fallback to the original extension if configuration fails
          return ext;
        }
      }
      // If no configure method, return the original extension
      return ext;
    });
  }, [extensions]);

  const onValueChange = throttle(editor => {
    const output = getOutput(editor, props.output as any);

    props?.onChangeContent?.(output as any);
  }, EDITOR_UPDATE_WATCH_THROTTLE_WAIT_TIME);

  const editor = useEditor({
    extensions: sortExtensions,
    content,
    onUpdate: ({ editor }) => {
      if (onValueChange) onValueChange(editor);
    },
    ...useEditorOptions,
  }) as any;

  useImperativeHandle(ref, () => {
    return {
      editor,
    };
  });

  useEffect(() => {
    editor?.setEditable(!props?.disabled);
    editableEditorActions.setDisable(id, !props?.disabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, props?.disabled]);

  useEffect(() => {
    if (props?.resetCSS !== false) {
      updateCSS(RESET_CSS, 'react-tiptap-reset');
    }

    return () => {
      removeCSS('react-tiptap-reset');
    };
  }, [props?.resetCSS]);

  function getOutput(
    editor: CoreEditor,
    output: RichTextEditorProps['output']
  ) {
    if (props?.removeDefaultWrapper) {
      if (output === 'html') {
        return editor.isEmpty ? '' : editor.getHTML();
      }
      if (output === 'json') {
        return editor.isEmpty ? {} : editor.getJSON();
      }
      if (output === 'text') {
        return editor.isEmpty ? '' : editor.getText();
      }
      return '';
    }

    if (output === 'html') {
      return editor.getHTML();
    }
    if (output === 'json') {
      return editor.getJSON();
    }
    if (output === 'text') {
      return editor.getText();
    }
    return '';
  }

  useLayoutEffect(() => {
    if (editor) editor!.id = id;
  }, [id, editor]);

  useEffect(() => {
    return () => {
      editor?.destroy?.();
    };
  }, []);

  const hasExtensionValue = hasExtension(editor, 'characterCount');

  if (!editor) {
    return <></>;
  }

  return (
    <div className='reactjs-tiptap-editor'>
      <ProviderRichText id={id}>
        <TooltipProvider delayDuration={0} disableHoverableContent>
          <div className='overflow-hidden rounded-[0.5rem] bg-background shadow outline '>
            <div className='flex max-h-full w-full flex-col'>
              {!props?.hideToolbar && (
                <Toolbar
                  disabled={!!props?.disabled}
                  editor={editor}
                  toolbar={props.toolbar}
                />
              )}

              <EditorContent
                className={`relative px-8 py-20 focus:border-none ${props?.contentClass || ''}`}
                editor={editor}
              />

              {hasExtensionValue && (
                <CharactorCount editor={editor} extensions={extensions} />
              )}

              {!props?.hideBubble && (
                <BubbleMenu
                  bubbleMenu={props?.bubbleMenu}
                  disabled={props?.disabled}
                  editor={editor}
                />
              )}
            </div>
          </div>
        </TooltipProvider>
      </ProviderRichText>
    </div>
  );
}

export default forwardRef(RichTextEditor);
