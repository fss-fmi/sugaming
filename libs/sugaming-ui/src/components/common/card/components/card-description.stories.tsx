import { Meta, StoryObj } from '@storybook/react';
import { CardDescription } from './card-description';

const meta: Meta<typeof CardDescription> = {
  title: 'Common/Card/CardDescription',
  component: CardDescription,
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

type Story = StoryObj<typeof CardDescription>;

export const CardDescriptionExample: Story = {
  args: {
    children: 'Card Description',
    className: '',
  },
};
