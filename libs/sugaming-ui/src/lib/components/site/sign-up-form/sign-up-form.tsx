'use client';

import { z } from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FaSignInAlt } from 'react-icons/fa';
import { signUp } from '@sugaming/sugaming-api-client/next';
import libConfig from '@sugaming/sugaming-services/config/lib.config';
import { Button } from '../../common/server';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PasswordChecklist,
  ScrollArea,
  Toaster,
  useToast,
} from '../../common/client';

export function SignUpForm() {
  const t = useTranslations('site.sign-up-form');
  const { toast } = useToast();

  const formSchema = z
    .object({
      firstName: z
        .string()
        .min(
          libConfig.user.firstName.minLength,
          t('too-short', { length: libConfig.user.firstName.minLength }),
        )
        .max(
          libConfig.user.firstName.maxLength,
          t('too-long', { length: libConfig.user.firstName.maxLength }),
        )
        .regex(libConfig.user.firstName.regex, t('regex-error')),
      lastName: z
        .string()
        .min(
          libConfig.user.lastName.minLength,
          t('too-short', { length: libConfig.user.lastName.minLength }),
        )
        .max(
          libConfig.user.lastName.maxLength,
          t('too-long', { length: libConfig.user.lastName.maxLength }),
        )
        .regex(libConfig.user.lastName.regex, t('regex-error')),
      nickname: z
        .string()
        .min(
          libConfig.user.nickname.minLength,
          t('too-short', { length: libConfig.user.nickname.minLength }),
        )
        .max(
          libConfig.user.nickname.maxLength,
          t('too-long', { length: libConfig.user.nickname.maxLength }),
        )
        .regex(libConfig.user.nickname.regex, t('regex-error')),
      email: z.string().email({
        message: t('invalid-email-format'),
      }),
      phone: z
        .string()
        .min(
          libConfig.user.phone.minLength,
          t('too-short', { length: libConfig.user.phone.minLength }),
        )
        .max(
          libConfig.user.phone.maxLength,
          t('too-long', { length: libConfig.user.phone.maxLength }),
        )
        .regex(libConfig.user.phone.regex, t('regex-error')),
      password: z
        .string()
        .min(
          libConfig.user.password.minLength,
          t('too-short', { length: libConfig.user.password.minLength }),
        )
        .regex(libConfig.user.password.regex, t('regex-error')),
      passwordConfirmation: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t('passwords-dont-match'),
      path: ['passwordConfirmation'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      nickname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { firstName, lastName, nickname, email, password } = values;
    const response = await signUp({
      firstName,
      lastName,
      nickname,
      email,
      password,
    });

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: response.error.message,
        description: t('try-again'),
      });
    }
  }

  return (
    <ScrollArea className="h-auto max-h-full">
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-flow-col grid-cols-1 lg:grid-cols-2 grid-rows-[repeat(12,_min-content)] lg:grid-rows-[repeat(5,_min-content)] auto-rows-min gap-x-8 gap-y-4 p-4"
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('first-name')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Георги"
                      className="overflow-visible"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('last-name')}</FormLabel>
                  <FormControl>
                    <Input placeholder="Иванов" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormDescription className="col-span-2">
              {t('name-description')}
            </FormDescription>
          </div>

          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('nickname')}</FormLabel>
                <FormControl>
                  <Input placeholder="gosholosho" {...field} />
                </FormControl>
                <FormDescription>{t('nickname-description')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('phone')}</FormLabel>
                <FormControl>
                  <Input placeholder="+359 888 888 888" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="row-span-2">
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <PasswordChecklist password={form.getValues().password} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password-confirmation')}</FormLabel>
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
    </ScrollArea>
  );
}
