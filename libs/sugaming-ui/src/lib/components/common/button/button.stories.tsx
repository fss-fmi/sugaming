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
    onClick: {
      action: 'clicked',
      description: 'Button click handler',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const DefaultButton: Story = {
  args: {
    children: 'Default Button',
  },
};

export const DestructiveButton: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
  },
};

export const OutlineButton: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const SecondaryButton: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const GhostButton: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const LinkButton: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
};

export const SmallButton: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const LargeButton: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const IconButton: Story = {
  args: {
    children: 'Icon Button',
    size: 'icon',
  },
};
