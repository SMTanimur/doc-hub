/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, useMemo } from 'react';

import {
  ActionMenuButton,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components';

import type { ButtonViewReturnComponentProps } from '@/types';

export interface Item {
  title: string;
  icon?: any;
  font?: string;
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>;
  action?: ButtonViewReturnComponentProps['action'];
  style?: React.CSSProperties;
  shortcutKeys?: string[];
  disabled?: boolean;
  divider?: boolean;
  default?: boolean;
}

interface Props {
  editor: any;
  disabled?: boolean;
  color?: string;
  shortcutKeys?: string[];
  maxHeight?: string | number;
  tooltip?: string;
  items?: Item[];
}

function FontFamilyButton(props: Props) {
  const active = useMemo(() => {
    const find: any = props?.items?.find((k: any) => k.isActive());

    if (find && !find.default) {
      return {
        ...find,
      };
    }
    const item: Item = {
      title: props.tooltip as any,
      font: 'Default',
      isActive: () => false,
      disabled: false,
      action: () => props.editor.chain().focus().unsetFontFamily().run(),
    };
    return item;
  }, [props]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={props?.disabled}>
        <ActionMenuButton
          disabled={props?.disabled}
          icon='MenuDown'
          title={
            active?.font?.length > 7
              ? `${active?.font?.slice(0, 6)}...`
              : active?.font
          }
          tooltip={props?.tooltip}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-full'>
        {props?.items?.map((item: any, index) => {
          const style =
            item.font === 'Deafult' ? {} : { fontFamily: item.font };

          return (
            <Fragment key={`font-family-${index}`}>
              <DropdownMenuCheckboxItem
                checked={active?.font === item.font}
                onClick={item.action}
              >
                <div className='ml-1 h-full' style={style}>
                  {item.font}
                </div>
              </DropdownMenuCheckboxItem>

              {item.font === 'Deafult' && <DropdownMenuSeparator />}
            </Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FontFamilyButton;
