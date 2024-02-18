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

      // University tab of the form
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
        ),
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
        .array(z.string())
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      firstName,
      lastName,
      nickname,
      email,
      phone,
      password,
      universityMajor,
      universityDegree,
      universityYear,
      universityFacultyNumber,
    } = values;
    const response = await signUp({
      firstName,
      lastName,
      nickname,
      email,
      phone,
      password,
      universityMajor,
      universityDegree,
      universityYear,
      universityFacultyNumber,
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
      <Tabs className="h-full" defaultValue="university">
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
                  <div className="grid w-full m-auto grid-flow-col grid-cols-1 lg:grid-cols-2 grid-rows-[repeat(5,_min-content)] lg:grid-rows-[repeat(3,_min-content)] gap-x-8 gap-y-4 p-4">
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
