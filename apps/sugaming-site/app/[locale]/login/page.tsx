import { LoginForm } from '@sugaming/sugaming-ui/lib/components/site/login-form/login-form';
import { getUser } from '@sugaming/sugaming-api-client/next';
import { redirect, RedirectType } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@sugaming/sugaming-ui/lib/components/common/server';

export default async function LoginPage() {
  if (await getUser()) {
    redirect('/', RedirectType.replace);
  }

  return (
    <Card className="mx-auto mt-10 hidden md:grid h-[750px] w-2/3 flex-col items-center justify-center lg:max-w-24 lg:grid-cols-2 lg:px-0 overflow-hidden">
      <div className="hidden lg:flex h-full flex-col p-10 text-white bg-zinc-900">
        <div className="relative z-20 flex items-center text-lg font-medium">
          Acme Inc
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            </p>
            <footer className="text-sm">SUGAMING</footer>
          </blockquote>
        </div>
      </div>

      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>

          <LoginForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </Card>
  );
}
