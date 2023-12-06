import { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    children: {
      type: 'string',
      defaultValue: 'Button',
      description: 'Button content',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    className: {
      type: 'string',
      defaultValue: '',
      description: 'Button class name',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    variant: {
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
      defaultValue: 'default',
      description: 'Button variant',
      control: {
        type: 'select',
      },
    },
    size: {
      type: 'string',
      defaultValue: 'default',
      description: 'Button size',
      options: ['default', 'sm', 'lg', 'icon'],
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;
export const ButtonExample: Story = {
  args: {
    children: 'Button',
  },
};
