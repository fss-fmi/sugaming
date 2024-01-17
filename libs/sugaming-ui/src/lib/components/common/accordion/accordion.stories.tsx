import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AccordionItem } from './component/accordion-item';
import { AccordionTrigger } from './component/accordion-trigger';
import { AccordionContent } from './component/accordion-content';
import { Accordion } from './component/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Common/Accordion',
  component: Accordion,
  argTypes: {
    type: {
      options: ['single', 'multiple'],
      defaultValue: 'default',
      description: 'Button variant',
      control: {
        type: 'select',
      },
    },
    collapsible: {
      type: 'boolean',
      defaultValue: true,
      description:
        'Whether an accordion item can be collapsed after it has been opened.',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    children: {
      description: 'Accordion content',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const AccordionExample: Story = {
  args: {
    type: 'single',
    collapsible: true,
    children: (
      <AccordionItem value="accordion-item">
        <AccordionTrigger>Accordion Trigger</AccordionTrigger>
        <AccordionContent>Accordion Content</AccordionContent>
      </AccordionItem>
    ),
  },
};
