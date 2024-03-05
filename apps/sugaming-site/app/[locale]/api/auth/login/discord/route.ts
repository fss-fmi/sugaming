import { getUser, loginDiscord } from '@sugaming/sugaming-api-client/next';
import { redirect, RedirectType } from 'next/navigation';
import { useLocale } from 'next-intl';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const locale = useLocale();

  const preLoginUser = await getUser();
  const response = await loginDiscord(code);

  // If the user was already logged in, redirect to account linking page
  if (preLoginUser) {
    return redirect(
      `/${locale}/account-linked?type=discord${response && response?.error ? `&error=${response.error}` : ''}`,
      RedirectType.replace,
    );
  }

  // Otherwise, redirect to the login page
  // If the user is logged in successfully, the login page will redirect to the home page
  return redirect(
    `/${locale}/login${response && response?.error ? `?error=${response.error}` : ''}`,
    RedirectType.replace,
  );
}
