/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui';

interface ISize {
  width: number | string;
  height: number | string;
}

interface IProps {
  width: number | string;
  maxWidth?: number | string;
  height: number | string;
  onOk: (arg: ISize) => void;
  children: React.ReactNode;
}

const containerStyle = { padding: '0 12px 12px' };

export const SizeSetter: React.FC<IProps> = ({
  width,
  maxWidth,
  height,
  onOk,
  children,
}: any) => {
  const [form, setForm] = useState({
    width: '',
    height: '',
    maxWidth: '',
  });

  useEffect(() => {
    setForm({
      width,
      height,
      maxWidth,
    });
  }, [height, maxWidth, width]);

  function handleSubmit(event: any) {
    event.preventDefault();
    event.stopPropagation();
    onOk(form);
  }

  return (
    <Popover modal>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent>
        <div style={containerStyle}>
          <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <Label className='mb-[6px]'>Width</Label>

            <div className='flex w-full max-w-sm items-center gap-1.5'>
              <div className='relative items-center w-full max-w-sm'>
                <Input
                  type='number'
                  value={form.width}
                  required
                  onChange={e => setForm({ ...form, width: e.target.value })}
                />
              </div>
            </div>

            <Label className='mb-[6px]'>Max Width</Label>

            <div className='flex w-full max-w-sm items-center gap-1.5'>
              <div className='relative items-center w-full max-w-sm'>
                <Input
                  type='number'
                  value={form.maxWidth}
                  required
                  onChange={e => setForm({ ...form, maxWidth: e.target.value })}
                />
              </div>
            </div>
            <Label className='mb-[6px]'>Height</Label>
            <div className='flex w-full max-w-sm items-center gap-1.5'>
              <div className='relative items-center w-full max-w-sm'>
                <Input
                  type='number'
                  value={form.height}
                  required
                  onChange={e => setForm({ ...form, height: e.target.value })}
                />
              </div>
            </div>

            <Button type='submit' className='self-end mt-2'>
              Apply
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};
