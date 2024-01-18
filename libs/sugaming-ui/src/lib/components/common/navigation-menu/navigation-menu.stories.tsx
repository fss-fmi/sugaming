import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NavigationMenu } from './components/navigation-menu';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './navigation-menu';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Common/NavigationMenu',
  component: NavigationMenu,
  argTypes: {
    children: {
      description: 'Navigation menu content',
    },
  },
};

export default meta;

type Story = StoryObj<typeof NavigationMenu>;

export const NavigationMenuExample: Story = {
  args: {
    className:
      'relative z-10 flex max-w-max flex-1 items-center justify-center',
    children: (
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Navigation menu trigger</NavigationMenuTrigger>
          <NavigationMenuContent>Navigation menu content</NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Navigation menu link
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    ),
  },
};
