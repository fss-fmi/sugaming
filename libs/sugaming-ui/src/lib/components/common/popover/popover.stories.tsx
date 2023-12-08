import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const meta: Meta<typeof Popover> = {
  title: 'Common/Popover',
};

export default meta;

type PopoverTriggerStory = StoryObj<typeof PopoverTrigger>;
const PopoverTriggerExample: PopoverTriggerStory = {
  render: (args) => (
    <Popover>
      <PopoverTrigger {...args} />
    </Popover>
  ),
};
PopoverTriggerExample.args = {
  children: <Button>Popover trigger</Button>,
  className: '',
};

type PopoverContentStory = StoryObj<typeof PopoverContent>;
const PopoverContentExample: PopoverContentStory = {
  render: (args) => (
    <Popover>
      <PopoverContent {...args} />,
    </Popover>
  ),
};
PopoverContentExample.args = {
  children: 'Popover content',
  className: '',
  align: 'center',
  sideOffset: 4,
};

type Story = StoryObj<typeof Popover>;
export const PopoverExample: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger {...PopoverTriggerExample.args}>
        <Button>Popover trigger</Button>
      </PopoverTrigger>
      <PopoverContent {...PopoverContentExample.args} />
    </Popover>
  ),
};
