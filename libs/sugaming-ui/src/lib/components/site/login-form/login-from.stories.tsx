import { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './login-form';

const meta: Meta<typeof LoginForm> = {
  title: 'Site/LoginForm',
  component: LoginForm,
  argTypes: {
    loginAction: { action: 'login' },
  },
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const ExampleLoginForm: Story = {};
