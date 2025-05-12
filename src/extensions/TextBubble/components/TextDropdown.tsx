/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useMemo } from 'react';

import { ChevronDown } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components';
import { icons } from '@/components/icons';

interface IPropsTextDropdown {
  editor: any;
  disabled?: boolean;
  color?: string;
  maxHeight?: string | number;
  icon?: any;
  tooltip?: string;
}

function TextDropdown(props: IPropsTextDropdown) {
  const menus = useMemo(() => {
    return [
      {
        name: 'paragraph',
        label: 'Paragraph',
        iconName: 'Heading1',
        isActive: () =>
          props.editor.isActive('paragraph') &&
          !props.editor.isActive('orderedList') &&
          !props.editor.isActive('bulletList') &&
          !props.editor.isActive('taskList'),
        action: () => props.editor.chain().focus().clearNodes().run(),
      },
      {
        name: 'heading1',
        label: 'Heading 1',
        isActive: () => props.editor.isActive('heading', { level: 1 }),
        iconName: 'Heading1',
        action: () =>
          props.editor
            .chain()
            .focus()
            .clearNodes()
            .toggleHeading({ level: 1 })
            .run(),
      },
      {
        name: 'heading2',
        label: 'Heading 2',
        isActive: () => props.editor.isActive('heading', { level: 2 }),
        iconName: 'Heading2',
        action: () =>
          props.editor
            .chain()
            .focus()
            .clearNodes()
            .toggleHeading({ level: 2 })
            .run(),
      },
      {
        name: 'heading3',
        label: 'Heading 3',
        isActive: () => props.editor.isActive('heading', { level: 3 }),
        iconName: 'Heading3',
        action: () =>
          props.editor
            .chain()
            .focus()
            .clearNodes()
            .toggleHeading({ level: 3 })
            .run(),
      },
      {
        name: 'bulletList',
        label: 'Bullet List',
        isActive: () => props.editor.isActive('bulletList'),
        iconName: 'List',
        action: () =>
          props.editor.chain().focus().clearNodes().toggleBulletList().run(),
      },
      {
        name: 'numberedList',
        label: 'Ordered List',
        isActive: () => props.editor.isActive('orderedList'),
        iconName: 'ListOrdered',
        action: () =>
          props.editor.chain().focus().clearNodes().toggleOrderedList().run(),
      },
      {
        name: 'taskList',
        label: 'Task List',
        isActive: () => props.editor.isActive('taskList'),
        iconName: 'ListTodo',
        action: () =>
          props.editor.chain().focus().clearNodes().toggleTaskList().run(),
      },
      {
        name: 'blockquote',
        label: 'Blockquote',
        isActive: () => props.editor.isActive('blockquote'),
        iconName: 'TextQuote',
        action: () =>
          props.editor.chain().focus().clearNodes().toggleBlockquote().run(),
      },
    ];
  }, [props.editor]);

  const activeItem = useMemo(() => {
    return (
      menus.findLast(item => item.isActive()) ?? {
        label: 'Empty',
      }
    );
  }, [menus]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='flex h-[32px] gap-1 px-1.5' variant='ghost'>
          <span className='whitespace-nowrap text-sm font-normal'>
            {' '}
            {activeItem?.label}
          </span>

          <ChevronDown className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align='start'
        className='w-full p-1'
        hideWhenDetached
        sideOffset={5}
      >
        {menus.map((item, index) => {
          const Icon = icons[item.iconName as any];

          return (
            <DropdownMenuCheckboxItem
              checked={item.isActive?.() || false}
              className='cursor-pointer'
              key={`text-bubble-${index}`}
              onClick={() => item.action()}
            >
              <div className='flex items-center gap-2 px-2'>
                <Icon className='h3 w-3' />

                <span> {item.label}</span>
              </div>
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TextDropdown;
