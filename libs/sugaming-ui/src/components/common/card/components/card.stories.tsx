import { Meta, StoryObj } from '@storybook/react';
import { CardContent } from './card-content';
import { CardHeader } from './card-header';
import { CardFooter } from './card-footer';
import { CardHeaderExample } from './card-header.stories';
import { CardContentExample } from './card-content.stories';
import { CardFooterExample } from './card-footer.stories';
import { Card } from './card';

const meta: Meta<typeof Card> = {
  title: 'Common/Card/Card',
  component: Card,
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional component classes.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const CardExample: Story = {
  args: {
    children: (
      <>
        <CardHeader {...CardHeaderExample.args} />
        <CardContent {...CardContentExample.args} />
        <CardFooter {...CardFooterExample.args} />
      </>
    ),
    className: '',
  },
};
