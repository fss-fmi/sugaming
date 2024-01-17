import { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from './scroll-area';

const meta: Meta = {
  title: 'Common/ScrollArea',
  component: ScrollArea,
  argTypes: {
    children: {
      description: 'Scroll area content',
    },
  },
};

export default meta;

type ScrollAreaStory = StoryObj<typeof ScrollArea>;

export const ScrollAreaExample: ScrollAreaStory = {
  args: {
    children: (
      <>
        {Array.from({ length: 100 }).map((index) => (
          <div key={`${index}`} className="p-4">
            Scroll area content
          </div>
        ))}
      </>
    ),
    className: 'h-64',
  },
};
