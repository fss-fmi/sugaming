import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../../../providers/theme-provider';
import { ThemeSwitcher } from './theme-switcher';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Common/ThemeSwitcher',
  component: ThemeSwitcher,
};

export default meta;

type Story = StoryObj<typeof ThemeSwitcher>;
export const ThemeSwitcherExample: Story = {
  render: () => (
    <ThemeProvider attribute="class">
      <ThemeSwitcher />
    </ThemeProvider>
  ),
};
