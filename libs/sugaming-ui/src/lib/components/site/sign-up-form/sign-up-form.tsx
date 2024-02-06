'use client';

import { z } from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FaSignInAlt } from 'react-icons/fa';
import { signUp } from '@sugaming/sugaming-api-client/next';
import libConfig from '@sugaming/sugaming-services/config/lib.config';
import { PersonalInformationFields } from './components/personal-information-fields';
import { UniversityInformationFields } from './components/university-information-fields';
import { Button } from '../../common/server';
import {
  Form,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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

      // Second part of the form
      university: z.string().min(3).max(100),
      faculty: z.string(),
      degree: z.string(),
      year: z.number(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t('passwords-dont-match'),
      path: ['passwordConfirmation'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      nickname: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  function isPersonalTabValid() {
    const personalTabFields = [
      'firstName',
      'lastName',
      'nickname',
      'email',
      'phone',
      'password',
      'passwordConfirmation',
    ];

    const touchedFields = Object.keys(form.formState.touchedFields);
    const haveAllFieldsBeenTouched = personalTabFields.every((element) =>
      touchedFields.includes(element),
    );
    const errorFields = Object.keys(form.formState.errors);
    const hasErrors = errorFields.length > 0;

    return haveAllFieldsBeenTouched && !hasErrors;
  }

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
    <>
      <Toaster />
      <Tabs className="h-full" defaultValue="personal">
        <Form {...form}>
          <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
            <TabsContent className="h-full" value="personal">
              <ScrollArea className="h-5/6">
                <div className="flex h-[50vh]">
                  <div className="grid m-auto grid-flow-col grid-cols-1 lg:grid-cols-2 grid-rows-[repeat(9,_min-content)] lg:grid-rows-[repeat(4,_min-content)] gap-x-8 gap-y-4 p-2 md:p-4">
                    <PersonalInformationFields form={form} />
                  </div>
                </div>
              </ScrollArea>

              <div className="grid grid-cols-2 grid-rows-1 gap-x-4 gap-y-2 h-1/6 py-5">
                <Button
                  className="col-start-2"
                  type="submit"
                  variant="secondary"
                  disabled={!isPersonalTabValid()}
                  asChild
                >
                  <TabsList asChild>
                    <TabsTrigger value="university">
                      {t('continue')}
                    </TabsTrigger>
                  </TabsList>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="university">
              <div className="grid grid-flow-col grid-cols-1 lg:grid-cols-2 grid-rows-[repeat(12,_min-content)] lg:grid-rows-[repeat(5,_min-content)] auto-rows-min gap-x-8 gap-y-4 p-2 md:p-4">
                <UniversityInformationFields form={form} />
              </div>

              <div className="grid grid-cols-2 grid-rows-1 gap-x-4 gap-y-2 h-1/6">
                <Button type="submit" variant="secondary" asChild>
                  <TabsList asChild>
                    <TabsTrigger value="personal">{t('return')}</TabsTrigger>
                  </TabsList>
                </Button>

                <Button type="submit">
                  <FaSignInAlt className="mr-2 h-4 w-4" /> {t('submit')}
                </Button>
              </div>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </>
  );
}
