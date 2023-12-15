import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { refreshTokens } from '@sugaming/sugaming-api-client/next';

export const config = {
  matcher: ['/', '/(bg|en)/:path*'],
};

export async function middleware(request: NextRequest) {
  // next-intl configuration
  const defaultLocale = request.headers.get('x-default-locale') || 'en';
  const handleI18nRouting = createIntlMiddleware({
    locales: ['en', 'bg'],
    defaultLocale,
  });
  const response = handleI18nRouting(request);
  response.headers.set('x-default-locale', defaultLocale);

  // refresh api tokens
  await refreshTokens(response.cookies);

  return response;
}
