import { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '../../../common/client';

interface UniversityInformationFieldsProps {
  form: UseFormReturn;
}

export function UniversityInformationFields({
  form,
}: UniversityInformationFieldsProps) {
  const t = useTranslations('site.sign-up-form');

  return (
    <FormField
      control={form.control}
      name="university"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('university')}</FormLabel>
          <FormControl>
            <Input placeholder="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
