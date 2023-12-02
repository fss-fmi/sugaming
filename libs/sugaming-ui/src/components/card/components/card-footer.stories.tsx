import { Meta, StoryObj } from '@storybook/react';
import { CardFooter } from './card-footer';

const meta: Meta<typeof CardFooter> = {
  title: 'Common/Card/CardFooter',
  component: CardFooter,
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

type Story = StoryObj<typeof CardFooter>;

export const CardFooterExample: Story = {
  args: {
    children: 'Card Footer',
    className: '',
  },
};
