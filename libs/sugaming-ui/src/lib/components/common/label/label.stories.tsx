import { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';

const meta: Meta<typeof Label> = {
  title: 'Common/Label',
  component: Label,
  argTypes: {
    children: {
      type: 'string',
      defaultValue: 'Label',
      description: 'Label content',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    className: {
      type: 'string',
      defaultValue: '',
      description: 'Label class name',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    htmlFor: {
      type: 'string',
      defaultValue: '',
      description: 'Label for',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;
export const LabelExample: Story = {
  args: {
    children: 'Label',
    className: '',
    htmlFor: '',
  },
};
