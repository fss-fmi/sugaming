import { loginDiscord } from '@sugaming/sugaming-api-client/next';
import { redirect, RedirectType } from 'next/navigation';
import { useLocale } from 'next-intl';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const locale = useLocale();

  const response = await loginDiscord(code);
  if (response?.error) {
    return redirect(
      `/${locale}/login?error=${response.error}`,
      RedirectType.replace,
    );
  }
  return redirect(`/${locale}/login`, RedirectType.replace);
}
