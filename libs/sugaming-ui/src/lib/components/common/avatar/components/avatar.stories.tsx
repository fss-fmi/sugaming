import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AvatarImage } from './avatar-image';
import { AvatarFallback } from './avatar-fallback';
import { AvatarFallbackExample } from './avatar-fallback.stories';
import { AvatarImageExample } from './avatar-image.stories';
import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Common/Avatar/Avatar',
  component: Avatar,
  argTypes: {
    className: {
      type: 'string',
      defaultValue: '',
      description: 'Avatar class name',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    children: {
      type: 'string',
      defaultValue: 'FSS',
      description: 'Avatar children',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;
export const AvatarExample: Story = {
  render: (args) => <Avatar {...args} />,
  args: {
    className: '',
    children: (
      <>
        <AvatarImage {...AvatarImageExample.args} />
        <AvatarFallback {...AvatarFallbackExample.args} />
      </>
    ),
  },
};
