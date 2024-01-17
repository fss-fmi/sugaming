import { Meta, StoryObj } from '@storybook/react';
import { NavbarLinks } from '../../site/navbar-links/navbar-links';
import { NavbarUserControls } from '../../site/navbar-user-controls/navbar-user-controls';
import { Navbar } from './navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Common/Navbar',
  component: Navbar,
  argTypes: {
    children: {
      type: 'string',
      defaultValue: 'Navbar',
      description: 'Navbar content',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const NavbarExample: Story = {
  args: {
    children: (
      <>
        <NavbarLinks className="block xl:hidden" variant="mobile" />

        <span className="font-bold capitalize">SUGAMING</span>

        <NavbarLinks
          className="hidden xl:flex justify-center"
          variant="desktop"
        />

        <NavbarUserControls user={undefined} className="" />
      </>
    ),
  },
};
