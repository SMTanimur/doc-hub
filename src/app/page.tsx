/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useState } from 'react';


import { TableOfContents } from '@/extensions/TableOfContent';
import { Clear } from '@/extensions/Clear';
import { FontFamily } from '@/extensions/FontFamily';
import { Heading } from '@/extensions/Heading';
import { FontSize } from '@/extensions/FontSize';
import { Bold } from '@/extensions/Bold';
import { Italic } from '@/extensions/Italic';
import { TextUnderline } from '@/extensions/TextUnderline';
import { Strike } from '@/extensions/Strike';
import { Emoji } from '@/extensions/Emoji';
import { Color } from '@/extensions/Color';
import { BulletList } from '@/extensions/BulletList';
import { OrderedList } from '@/extensions/OrderedList';
import { TextAlign } from '@/extensions/TextAlign';
import { Indent } from '@/extensions/Indent';
import { LineHeight } from '@/extensions/LineHeight';
import { TaskList } from '@/extensions/TaskList';
import { Link } from '@/extensions/Link';
import { Image } from '@/extensions/Image';
import { Video } from '@/extensions/Video';
import { Blockquote } from '@/extensions/Blockquote';
import { SlashCommand } from '@/extensions/SlashCommand';
import { HorizontalRule } from '@/extensions/HorizontalRule';
import { Code } from '@/extensions/Code';
import { CodeBlock } from '@/extensions/CodeBlock';
import { ColumnActionButton } from '@/extensions/MultiColumn';
import { Table } from '@/extensions/Table';
import { Iframe } from '@/extensions/Iframe';
import { ExportPdf } from '@/extensions/ExportPdf';
import { ExportWord } from '@/extensions/ExportWord';
import { TextDirection } from '@/extensions/TextDirection';
import { Mention } from '@/extensions/Mention';
import { Attachment } from '@/extensions/Attachment';
import { Mermaid } from '@/extensions/Mermaid';
import { Drawer } from '@/extensions/Drawer';
import { BaseKit } from '@/extensions/BaseKit';
import RichTextEditor from '@/components/RichTextEditor';
import {
  BubbleMenuDrawer,
  BubbleMenuMermaid,
} from '@/components/menus/bubble-extra';
import { AnyExtension } from '@tiptap/core';
import { Highlight } from '@/extensions/Highlight';
import { History } from '@/extensions/History';

function convertBase64ToBlob(base64: string) {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  History,

  TableOfContents,

  Clear,
  FontFamily,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  TextUnderline,
  Strike,

  Emoji,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
  Indent,
  LineHeight,
  TaskList.configure({
    spacer: true,
    taskItem: {
      nested: true,
    },
  }),
  Link,
  Image.configure({
    upload: (files: File) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files));
        }, 500);
      });
    },
  }),
  Video.configure({
    upload: (files: File) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files));
        }, 500);
      });
    },
  }),

  Blockquote,
  SlashCommand,
  HorizontalRule,
  Code.configure({
    toolbar: false,
  }),
  CodeBlock,
  ColumnActionButton,
  Table,
  Iframe,
  ExportPdf.configure({ spacer: true }),

  ExportWord,
  TextDirection,
  Mention,
  Attachment.configure({
    upload: (file: any) => {
      // fake upload return base 64
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise(resolve => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string);
          resolve(URL.createObjectURL(blob));
        }, 300);
      });
    },
  }),

  Mermaid.configure({
    upload: (file: any) => {
      // fake upload return base 64
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise(resolve => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string);
          resolve(URL.createObjectURL(blob));
        }, 300);
      });
    },
  }),
  Drawer.configure({
    upload: (file: any) => {
      // fake upload return base 64
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise(resolve => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string);
          resolve(URL.createObjectURL(blob));
        }, 300);
      });
    },
  }),
];

const DEFAULT = `<h1 dir="auto" style="text-align: center">Rich Text Editor</h1><p dir="auto">A modern WYSIWYG rich text editor based on <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://github.com/scrumpy/tiptap">tiptap</a> and <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://ui.shadcn.com/">shadcn ui</a> for Reactjs</p><p dir="auto"></p><p dir="auto" style="text-align: center"></p><p dir="auto"><div style="text-align: center;" class="image"><img height="auto" style="" src="https://picsum.photos/1920/1080.webp?t=1" flipx="false" flipy="false" width="500" align="center" inline="false"></div></p><p dir="auto"></p><div data-type="horizontalRule"><hr></div><h2 dir="auto">Demo</h2><p dir="auto">👉<a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://reactjs-tiptap-editor.vercel.app/">Demo</a></p><h2 dir="auto">Features</h2><ul><li><p dir="auto">Use <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://ui.shadcn.com/">shadcn ui</a> components</p></li><li><p dir="auto">Markdown support</p></li><li><p dir="auto">TypeScript support</p></li><li><p dir="auto">I18n support (vi, en, zh, pt)</p></li><li><p dir="auto">React support</p></li><li><p dir="auto">Slash Commands</p></li><li><p dir="auto">Multi Column</p></li><li><p dir="auto">TailwindCss</p></li><li><p dir="auto">Support emoji</p></li><li><p dir="auto">Support iframe</p></li><li><p dir="auto">Support mermaid</p></li></ul><h2 dir="auto">Installation</h2><pre code="pnpm install reactjs-tiptap-editor" language="bash" linenumbers="true" wordwrap="false" tabsize="2" shouldfocus="false"><code>pnpm install reactjs-tiptap-editor</code></pre><p dir="auto"></p>`;

function debounce(func: any, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function App() {
  const [content, setContent] = useState(DEFAULT);

  const onValueChange = useCallback(
    debounce((value: any) => {
      setContent(value);
    }, 300),
    []
  );

  return (
    <div
      className='p-[24px] flex flex-col w-full max-w-screen-lg gap-[24px] mx-[auto] my-0'
      style={{
        maxWidth: 1024,
        margin: '40px auto',
      }}
    >
      <RichTextEditor
        output='html'
        content={content as any}
        onChangeContent={onValueChange}
        extensions={extensions as AnyExtension[]}
        bubbleMenu={{
          render({ extensionsNames, editor, disabled }, bubbleDefaultDom) {
            return (
              <>
                {bubbleDefaultDom}

                {extensionsNames.includes('mermaid') ? (
                  <BubbleMenuMermaid
                    disabled={disabled}
                    editor={editor}
                    key='mermaid'
                  />
                ) : null}
                {extensionsNames.includes('drawer') ? (
                  <BubbleMenuDrawer
                    disabled={disabled}
                    editor={editor}
                    key='drawer'
                  />
                ) : null}
              </>
            );
          },
        }}
      />

      {typeof content === 'string' && (
        <textarea
          style={{
            marginTop: 20,
            height: 500,
          }}
          readOnly
          value={content}
        />
      )}
    </div>
  );
}

export default App;
