'use client';

import { FaSignInAlt } from 'react-icons/fa';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { Color } from '@prisma/client';
import libConfig from '@sugaming/sugaming-services/config/lib.config';
import ApiClient from '@sugaming/sugaming-api-client/client';
import { getBearerToken } from '@sugaming/sugaming-api-client/next';
import { useRouter } from 'next/navigation';
import { Button } from '../../common/button/button';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
  toast,
  Toaster,
} from '../../common/client';
import { Logo } from '../server';

interface CreateTeamDialogProps {
  children: React.ReactNode;
}

export function CreateTeamDialog({ children }: CreateTeamDialogProps) {
  const t = useTranslations('site.create-team-dialog');
  const colors = Object.values(Color);
  const locale = useLocale();
  const router = useRouter();

  const formSchema = z.object({
    name: z
      .string({
        required_error: t('required'),
      })
      .min(
        libConfig.cs2Team.name.minLength,
        t('too-short', { length: libConfig.cs2Team.name.minLength }),
      )
      .max(
        libConfig.cs2Team.name.maxLength,
        t('too-long', { length: libConfig.cs2Team.name.maxLength }),
      ),
    color: z.enum(
      Object.values(libConfig.cs2Team.color.enum) as [string, ...string[]],
      {
        required_error: t('is-required'),
      },
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      color: 'BLUE',
    },
  });

  async function createTeam(requestBody: z.infer<typeof formSchema>) {
    try {
      return await ApiClient.Cs2TeamsApiService.cs2TeamsControllerPostV1({
        requestBody: {
          name: requestBody.name,
          color: requestBody.color,
        },
        acceptLanguage: locale,
        authorization: await getBearerToken(),
      });
    } catch (error) {
      if (error instanceof ApiClient.ApiError) {
        return { error: error.body.message };
      }
      return { error: t('try-again') };
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await createTeam(values);

    if (response?.error) {
      toast({
        variant: 'destructive',
        title: response.error,
        description: t('try-again'),
      });
    } else {
      router.push(`/${locale}/cs2/teams/${response.id}`);
    }
  }

  return (
    <>
      <Toaster />
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          {/* Banner */}
          <div
            className="flex flex-col w-full h-32 mt-4 overflow-ellipsis justify-center items-center text-center text-white"
            style={{
              backgroundColor:
                libConfig.cs2Team.color.mapping[form.watch('color')],
            }}
          >
            <span className="w-fit h-12 px-2 py-1 text-3xl font-bold bg-white text-black dark:bg-black dark:text-white whitespace-nowrap">
              {form.watch('name')}
            </span>
            <Logo className="px-4 py-2 scale-50 -mt-3 bg-white text-black dark:bg-black dark:text-white" />
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 max-w-xl m-4 mx-auto"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('name')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('name-placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{t('color')}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-8 grid-rows-2 grid-flow-row space-y-1"
                      >
                        {colors.map((color) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem
                                className="w-16 h-16"
                                style={{
                                  backgroundColor:
                                    libConfig.cs2Team.color.mapping[color],
                                }}
                                value={color}
                              />
                            </FormControl>
                          </FormItem>
                        ))}
                      </RadioGroup>
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
        </DrawerContent>
      </Drawer>
    </>
  );
}
