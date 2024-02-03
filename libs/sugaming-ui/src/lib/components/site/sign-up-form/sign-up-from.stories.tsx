import { Meta, StoryObj } from '@storybook/react';
import { SignUpForm } from './sign-up-form';

const meta: Meta<typeof SignUpForm> = {
  title: 'Site/SignUpForm',
  component: SignUpForm,
  argTypes: {
    error: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

export const ExampleLoginForm: Story = {};
