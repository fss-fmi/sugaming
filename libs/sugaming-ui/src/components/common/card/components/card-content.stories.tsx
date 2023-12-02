import { Meta, StoryObj } from '@storybook/react';
import { CardContent } from './card-content';

const meta: Meta<typeof CardContent> = {
  title: 'Common/Card/CardContent',
  component: CardContent,
  argTypes: {
    children: {
      control: 'text',
    },
    className: {
      control: 'text',
      description: 'Additional component classes.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardContent>;

export const CardContentExample: Story = {
  args: {
    children: 'Card Content',
    className: '',
  },
};
