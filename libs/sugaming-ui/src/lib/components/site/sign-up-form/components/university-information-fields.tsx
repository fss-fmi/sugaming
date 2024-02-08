import { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../common/client';

interface UniversityInformationFieldsProps {
  form: UseFormReturn;
}

export function UniversityInformationFields({
  form,
}: UniversityInformationFieldsProps) {
  const t = useTranslations('site.sign-up-form');

  return (
    <>
      <FormField
        control={form.control}
        name="universityMajor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('university-major')}</FormLabel>
            <FormControl>
              <Input placeholder="Компютърни науки" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="universityDegree"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('university-degree')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
              </FormControl>
              <SelectContent position="item-aligned">
                <SelectItem value="BACHELOR">
                  {t('university-degree-bachelor')}
                </SelectItem>
                <SelectItem value="MASTER">
                  {t('university-degree-master')}
                </SelectItem>
                <SelectItem value="DOCTORATE">
                  {t('university-degree-doctorate')}
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="universityYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('university-year')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
              </FormControl>
              <SelectContent position="item-aligned">
                <SelectItem value="FIRST">
                  {t('university-year-first')}
                </SelectItem>
                <SelectItem value="SECOND">
                  {t('university-year-second')}
                </SelectItem>
                <SelectItem value="THIRD">
                  {t('university-year-third')}
                </SelectItem>
                <SelectItem value="FOURTH">
                  {t('university-year-fourth')}
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="universityFacultyNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('university-faculty-number')}</FormLabel>
            <FormControl>
              <Input placeholder="0MI123456" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
