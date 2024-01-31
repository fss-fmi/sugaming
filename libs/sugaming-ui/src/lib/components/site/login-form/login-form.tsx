'use client';

import { z } from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@sugaming/sugaming-api-client/next';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import { CgSpinnerAlt } from 'react-icons/cg';
import { FaDiscord } from 'react-icons/fa6';
import { FaSignInAlt } from 'react-icons/fa';
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

interface LoginFormProps {
  error: string;
}

export function LoginForm({ error }: LoginFormProps) {
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

  const [displayedErrorProp, setDisplayedErrorProp] = useState<boolean>(false);
  if (error && !displayedErrorProp) {
    toast({
      variant: 'destructive',
      title: error,
      description: t('try-again'),
    });
    setDisplayedErrorProp(true);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await login(values.email, values.password);

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: response.error,
        description: t('try-again'),
      });
    }
  }

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Toaster />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            <FaSignInAlt className="mr-2 h-4 w-4" /> {t('submit')}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t('or-continue-with')}
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading} asChild>
        <Link href="http://localhost:3000/api/v1/auth/login/discord">
          {isLoading ? (
            <CgSpinnerAlt className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaDiscord className="mr-2 h-4 w-4" />
          )}
          Discord
        </Link>
      </Button>
    </>
  );
}
