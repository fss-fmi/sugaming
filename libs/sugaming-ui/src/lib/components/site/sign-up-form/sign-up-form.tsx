'use client';

import { z } from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { FaSignInAlt } from 'react-icons/fa';
import libConfig from '@sugaming/sugaming-services/config/lib.config';
import { useRouter } from 'next/navigation';
import { login } from '@sugaming/sugaming-api-client/next';
import { useState } from 'react';
import { CgSpinnerAlt } from 'react-icons/cg';
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
  const locale = useLocale();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z
    .object({
      // Personal tab of the form
      firstName: z
        .string({
          required_error: t('is-required'),
        })
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
        .string({
          required_error: t('is-required'),
        })
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
        .string({
          required_error: t('is-required'),
        })
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
        .string({
          required_error: t('is-required'),
        })
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
        .string({
          required_error: t('is-required'),
        })
        .min(
          libConfig.user.password.minLength,
          t('too-short', { length: libConfig.user.password.minLength }),
        )
        .regex(libConfig.user.password.regex, t('regex-error')),
      passwordConfirmation: z.string(),
      termsAndConditions: z.boolean({
        required_error: t('is-required'),
      }),

      // University tab of the form
      university: z.enum(
        Object.values(libConfig.user.university.enum) as [string, ...string[]],
        {
          required_error: t('is-required'),
        },
      ),
      universityMajor: z
        .string({
          required_error: t('is-required'),
        })
        .min(
          libConfig.user.universityMajor.minLength,
          t('too-short', { length: libConfig.user.universityMajor.minLength }),
        )
        .max(
          libConfig.user.universityMajor.maxLength,
          t('too-long', { length: libConfig.user.universityMajor.maxLength }),
        )
        .regex(libConfig.user.universityMajor.regex, {
          message: t('regex-error'),
        }),
      universityDegree: z.enum(
        Object.values(libConfig.user.universityDegree.enum) as [
          string,
          ...string[],
        ],
        {
          required_error: t('is-required'),
        },
      ),
      universityYear: z.enum(
        Object.values(libConfig.user.universityYear.enum) as [
          string,
          ...string[],
        ],
        {
          required_error: t('is-required'),
        },
      ),
      universityFacultyNumber: z
        .string({
          required_error: t('is-required'),
        })
        .min(libConfig.user.universityFacultyNumber.minLength, {
          message: t('too-short', {
            length: libConfig.user.universityFacultyNumber.minLength,
          }),
        })
        .max(libConfig.user.universityFacultyNumber.maxLength, {
          message: t('too-long', {
            length: libConfig.user.universityFacultyNumber.maxLength,
          }),
        })
        .regex(libConfig.user.universityFacultyNumber.regex, {
          message: t('regex-error'),
        }),
      universityProofImages: z
        .array(
          z.any({
            required_error: t('is-required'),
          }),
        )
        .min(libConfig.user.universityProofImages.min, {
          message: t('too-short', {
            length: libConfig.user.universityProofImages.min,
          }),
        })
        .max(libConfig.user.universityProofImages.max, {
          message: t('too-long', {
            length: libConfig.user.universityProofImages.max,
          }),
        }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t('passwords-dont-match'),
      path: ['passwordConfirmation'],
    })
    .refine((data) => data.termsAndConditions, {
      message: t('isRequired'),
      path: ['termsAndConditions'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'all',
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
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const formData = new FormData();
    data.universityProofImages.forEach((image) => {
      formData.append('universityProofImages', image.file);
    });

    Object.keys(data).forEach((key) => {
      if (
        key !== 'universityProofImages' &&
        key !== 'passwordConfirmation' &&
        key !== 'termsAndConditions'
      ) {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/users`,
        {
          method: 'POST',
          body: formData,
          headers: {
            'Accept-Language': locale,
          },
        },
      );
      const json = await response.json();

      if (response.ok) {
        // Handle success
        login(data.email, data.password);
        router.push(`/${locale}/login`);
      } else {
        // Handle errors
        toast({
          variant: 'destructive',
          title: json.message || t('error-occurred'),
          description: t('try-again'),
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('error-occurred'),
        description: t('try-again'),
      });
    }
    setIsLoading(false);
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
                  <div className="grid w-full m-auto grid-flow-col grid-cols-1 lg:grid-cols-2 grid-rows-[repeat(9,_min-content)] lg:grid-rows-[repeat(4,_min-content)] gap-x-8 gap-y-4 p-4">
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

            <TabsContent className="h-full" value="university">
              <ScrollArea className="h-5/6">
                <div className="flex h-[50vh]">
                  <div className="grid w-full m-auto grid-flow-col grid-cols-1 lg:grid-cols-2 grid-rows-[repeat(6,_min-content)] lg:grid-rows-[repeat(4,_min-content)] gap-x-8 gap-y-4 p-4">
                    <UniversityInformationFields form={form} />
                  </div>
                </div>
              </ScrollArea>

              <div className="grid grid-cols-2 grid-rows-1 gap-x-4 gap-y-2 h-1/6 py-5">
                <Button type="submit" variant="secondary" asChild>
                  <TabsList asChild>
                    <TabsTrigger value="personal">{t('return')}</TabsTrigger>
                  </TabsList>
                </Button>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <CgSpinnerAlt className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FaSignInAlt className="mr-2 h-4 w-4" />
                  )}
                  {t('submit')}
                </Button>
              </div>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </>
  );
}
