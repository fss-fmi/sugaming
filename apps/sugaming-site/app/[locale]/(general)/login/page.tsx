import { LoginForm } from '@sugaming/sugaming-ui/lib/components/site/login-form/login-form';
import { getUser } from '@sugaming/sugaming-api-client/next';
import { redirect, RedirectType } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@sugaming/sugaming-ui/lib/components/common/server';
import { getTranslations } from 'next-intl/server';
import { Logo } from '@sugaming/sugaming-ui/lib/components/site/server';
import { useLocale } from 'next-intl';

export async function generateMetadata() {
  const t = await getTranslations('login-page');
  return {
    title: t('title'),
    description: t('description'),
  };
}

interface LoginPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  if (await getUser()) {
    redirect('/', RedirectType.replace);
  }

  const t = await getTranslations('login-page');
  const error = searchParams?.error as string | undefined;
  const locale = useLocale();

  return (
    <Card className="mx-auto mt-10 grid h-5/6 w-5/6 md:w-2/3 flex-col items-center justify-center xl:grid-cols-2 xl:px-0 overflow-hidden">
      <div className="hidden xl:flex h-full flex-col p-10 text-white bg-zinc-900">
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo />
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <footer className="text-sm">SUGAMING</footer>
          </blockquote>
        </div>
      </div>

      <div className="p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('heading')}
            </h1>
            <p className="text-sm text-muted-foreground">{t('description')}</p>
          </div>

          <LoginForm error={error} />

          <p className="px-4 text-center text-sm text-muted-foreground">
            {t('by-signing-in-you-agree-to-our')}{' '}
            <Link
              href={`/${locale}/regulations`}
              target="_blank"
              className="underline underline-offset-4 hover:text-primary"
            >
              {t('club-regulations')}
            </Link>
            .
          </p>
        </div>
      </div>
    </Card>
  );
}
