import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { IntlProvider } from 'next-intl';
import messages from '../../../../i18n/en.json';
import { ThemeSwitcher } from './theme-switcher';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
    setTheme: jest.fn(),
  })),
}));

const useThemeMock = {
  theme: 'light',
  setTheme: jest.fn(),
};

jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => useThemeMock),
}));

describe('ThemeSwitcher', () => {
  test('renders component with light theme selected', () => {
    render(
      <IntlProvider messages={messages} locale="en">
        <ThemeSwitcher />
      </IntlProvider>,
    );

    expect(screen.getByLabelText(/light/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/system/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dark/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/light/i)).toBeChecked();
  });

  test('changes theme to dark when dark radio button is clicked', () => {
    render(
      <IntlProvider messages={messages} locale="en">
        <ThemeSwitcher />
      </IntlProvider>,
    );

    fireEvent.click(screen.getByLabelText(/dark/i));
    expect(useThemeMock.setTheme).toBeCalledWith('dark');
  });

  test('changes theme to light when light radio button is clicked', () => {
    render(
      <IntlProvider messages={messages} locale="en">
        <ThemeSwitcher />
      </IntlProvider>,
    );

    fireEvent.click(screen.getByLabelText(/light/i));
    expect(useThemeMock.setTheme).toBeCalledWith('light');
  });

  test('changes theme to system when system radio button is clicked', () => {
    render(
      <IntlProvider messages={messages} locale="en">
        <ThemeSwitcher />
      </IntlProvider>,
    );

    fireEvent.click(screen.getByLabelText(/system/i));
    expect(useThemeMock.setTheme).toBeCalledWith('system');
  });

  // Cleanup mocks after all tests
  afterAll(() => {
    jest.restoreAllMocks();
  });
});
