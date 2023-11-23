import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './app/i18n';

export default createMiddleware({
  defaultLocale,
  locales,
});

export const config = {
  matcher: ['/', '/(bg|en)/:path*'],
};
