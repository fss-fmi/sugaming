import { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Common/Badge',
  component: Badge,
  argTypes: {
    children: {
      type: 'string',
      defaultValue: 'Badge',
      description: 'Badge content',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    variant: {
      options: [
        'default',
        'defaultStatic',
        'secondary',
        'secondaryStatic',
        'destructive',
        'outline',
      ],
      defaultValue: 'default',
      description: 'Badge variant',
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const DefaultBadge: Story = {
  args: {
    children: 'Default Badge',
  },
};

export const DefaultStaticBadge: Story = {
  args: {
    children: 'Default Static Badge',
    variant: 'defaultStatic',
  },
};

export const SecondaryBadge: Story = {
  args: {
    children: 'Secondary Badge',
    variant: 'secondary',
  },
};

export const SecondaryStaticBadge: Story = {
  args: {
    children: 'Secondary Static Badge',
    variant: 'secondaryStatic',
  },
};

export const DestructiveBadge: Story = {
  args: {
    children: 'Destructive Badge',
    variant: 'destructive',
  },
};

export const OutlineBadge: Story = {
  args: {
    children: 'Outline Badge',
    variant: 'outline',
  },
};
