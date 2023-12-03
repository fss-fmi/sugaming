import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: {
      ...(await import(`../i18n/${locale}.json`)).default,
      ...(await import(`@sugaming/sugaming-ui/i18n/${locale}.json`)).default,
    },
  };
});

export const defaultLocale = 'bg';
export const locales = [defaultLocale, 'en'];
