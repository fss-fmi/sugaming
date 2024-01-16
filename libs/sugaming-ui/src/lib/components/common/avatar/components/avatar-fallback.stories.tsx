import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar } from './avatar';
import { AvatarFallback } from './avatar-fallback';

const meta: Meta<typeof AvatarFallback> = {
  title: 'Common/Avatar/AvatarFallback',
  component: AvatarFallback,
  argTypes: {
    className: {
      type: 'string',
      defaultValue: '',
      description: 'AvatarFallback class name',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    children: {
      type: 'string',
      defaultValue: 'FSS',
      description: 'AvatarFallback children',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AvatarFallback>;
export const AvatarFallbackExample: Story = {
  render: (args) => (
    <Avatar>
      <AvatarFallback {...args} />
    </Avatar>
  ),
  args: {
    className: '',
    children: 'FSS',
  },
};
