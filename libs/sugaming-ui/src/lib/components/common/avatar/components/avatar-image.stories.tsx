import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AvatarImage } from './avatar-image';
import { Avatar } from './avatar';

const meta: Meta<typeof AvatarImage> = {
  title: 'Common/Avatar/AvatarImage',
  component: AvatarImage,
  argTypes: {
    className: {
      type: 'string',
      defaultValue: '',
      description: 'AvatarImage class name',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    src: {
      type: 'string',
      defaultValue: '',
      description: 'AvatarImage src',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    alt: {
      type: 'string',
      defaultValue: '',
      description: 'AvatarImage alt',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AvatarImage>;
export const AvatarImageExample: Story = {
  render: (args) => (
    <Avatar>
      <AvatarImage {...args} />
    </Avatar>
  ),
  args: {
    className: '',
    src: 'https://github.com/fss-fmi.png',
    alt: 'FSS of FMI',
  },
};
