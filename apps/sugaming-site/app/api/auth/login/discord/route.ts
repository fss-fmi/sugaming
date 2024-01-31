import { loginDiscord } from '@sugaming/sugaming-api-client/next';
import { redirect, RedirectType } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  await loginDiscord(code);
  redirect('/', RedirectType.replace);
}
