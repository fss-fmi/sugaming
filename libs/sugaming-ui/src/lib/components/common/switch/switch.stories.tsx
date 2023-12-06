import { Meta, StoryObj } from '@storybook/react';
import { Switch } from './swtich';

const meta: Meta<typeof Switch> = {
  title: 'Common/Switch',
  component: Switch,
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional component classes.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const SwitchExample: Story = {
  args: {
    className: '',
  },
};
