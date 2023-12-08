import '../src/global.css';
import { Preview } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import messages from '../src/i18n/en.json';

const preview: Preview = {
  parameters: {},
};

export const decorators = [
  (Story: React.ComponentType) => (
    <NextIntlClientProvider locale="en" messages={messages}>
      <Story />
    </NextIntlClientProvider>
  ),
];

export default preview;
