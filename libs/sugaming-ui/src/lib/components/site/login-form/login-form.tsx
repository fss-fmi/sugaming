'use client';

import { z } from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@sugaming/sugaming-api-client/next';
import { Button } from '../../common/server';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Toaster,
  useToast,
} from '../../common/client';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email format.',
  }),
  password: z.string(),
});

export function LoginForm() {
  const t = useTranslations('site.login-form');
  const { toast } = useToast();

  const formSchema = z.object({
    email: z.string().email({
      message: t('invalid-email-format'),
    }),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { toast } = useToast();

  async function loginAction(formData: FormData) {
    const response = await login(
      formData.get('email') as string,
      formData.get('password') as string,
    );

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: response.error,
        description: t('try-again'),
      });
    }
  }

  return (
    <>
      <Toaster />

      <Form {...form}>
        <form action={loginAction} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input placeholder="gosho@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{t('submit')}</Button>
        </form>
      </Form>
    </>
  );
}
