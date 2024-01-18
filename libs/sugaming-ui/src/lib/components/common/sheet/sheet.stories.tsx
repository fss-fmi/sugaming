import { Meta } from '@storybook/react';

import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

const meta: Meta = {
  title: 'Common/Sheet',
  component: Sheet,
  argTypes: {
    side: {
      options: ['left', 'right', 'top', 'bottom'],
      defaultValue: 'left',
      description: 'Sheet side',
      control: {
        type: 'select',
      },
    },
    children: {
      description: 'Sheet menu content',
    },
  },
};

export default meta;

export const SheetExample = {
  render: (args: { side: 'left' | 'right' | 'top' | 'bottom' }) => (
    <Sheet>
      <SheetTrigger>Sheet Trigger</SheetTrigger>
      <SheetContent side={args.side}>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Sheet Description</SheetDescription>
        </SheetHeader>
        Sheet Content
        <SheetFooter>
          Sheet Footer
          <SheetClose>Sheet Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  args: {
    side: 'left',
  },
};
