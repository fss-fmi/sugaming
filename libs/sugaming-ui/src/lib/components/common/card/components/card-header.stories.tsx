import { Meta, StoryObj } from '@storybook/react';
import { CardTitleExample } from './card-title.stories';
import { CardDescription } from './card-description';
import { CardHeader } from './card-header';
import { CardDescriptionExample } from './card-description.stories';
import { CardTitle } from './card-title';

const meta: Meta<typeof CardHeader> = {
  title: 'Common/Card/CardHeader',
  component: CardHeader,
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional component classes.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardHeader>;

export const CardHeaderExample: Story = {
  render: (args) => <CardHeader {...args} />,
  args: {
    children: (
      <>
        <CardTitle {...CardTitleExample.args} />
        <CardDescription {...CardDescriptionExample.args} />
      </>
    ),
    className: '',
  },
};
