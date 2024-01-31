import { LoginForm } from '@sugaming/sugaming-ui/lib/components/site/login-form/login-form';
import { getUser } from '@sugaming/sugaming-api-client/next';
import { redirect, RedirectType } from 'next/navigation';

export default async function LoginPage() {
  if (await getUser()) {
    redirect('/', RedirectType.replace);
  }

  return (
    <>
      <h1>Log In Page</h1>
      <LoginForm />
    </>
  );
}
