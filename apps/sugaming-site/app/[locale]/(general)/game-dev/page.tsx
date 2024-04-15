import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

export default async function GameDevPage() {
  const locale = await getLocale();
  redirect(`${locale}/game-dev/1`);
}
