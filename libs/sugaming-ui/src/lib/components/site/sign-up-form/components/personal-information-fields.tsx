'use client';

import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import Link from 'next/link';
import {
  Checkbox,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PasswordChecklist,
} from '../../../common/client';

interface PersonalInformationFieldsProps {
  form: UseFormReturn;
}

export function PersonalInformationFields({
  form,
}: PersonalInformationFieldsProps) {
  const t = useTranslations('site.sign-up-form');

  return (
    <>
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

      <FormField
        control={form.control}
        name="termsAndConditions"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{t('accept-club-regulations')}</FormLabel>
              <FormDescription className="text-center text-sm text-muted-foreground">
                {t('please-read-the')}{' '}
                <Link
                  href="/regulations"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  {t('club-regulations')}
                </Link>{' '}
                {t('before-signing-up')}.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </>
  );
}
