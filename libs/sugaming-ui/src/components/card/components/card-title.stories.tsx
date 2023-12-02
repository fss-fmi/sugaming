import { Meta, StoryObj } from '@storybook/react';
import { CardTitle } from './card-title';

const meta: Meta<typeof CardTitle> = {
  title: 'Common/Card/CardTitle',
  component: CardTitle,
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

type Story = StoryObj<typeof CardTitle>;

export const CardTitleExample: Story = {
  render: (args) => <CardTitle {...args} />,
  args: {
    children: 'Card Title',
    className: '',
  },
};
