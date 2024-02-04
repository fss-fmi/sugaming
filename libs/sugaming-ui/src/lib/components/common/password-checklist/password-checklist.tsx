'use client';

import { FaCheck, FaX } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';

interface PasswordChecklistProps {
  password: string;
}

export function PasswordChecklist({ password }: PasswordChecklistProps) {
  const t = useTranslations('common.password-checklist');
  const check = <FaCheck className="mr-1 h-3 w-3" />;
  const cross = <FaX className="mr-1 h-3 w-3" />;
  return (
    <div className="text-[0.8rem] text-muted-foreground">
      <p>{t('title')}</p>
      <ul>
        <li className="flex items-center">
          {password.length >= 8 ? check : cross}
          {t('length')}
        </li>
        <li className="flex items-center">
          {/[А-ЯA-Z]/.test(password) ? check : cross}
          {t('uppercase')}
        </li>
        <li className="flex items-center">
          {/[а-яa-z]/.test(password) ? check : cross}
          {t('lowercase')}
        </li>
        <li className="flex items-center">
          {/\d/.test(password) ? check : cross}
          {t('number')}
        </li>
        <li className="flex items-center">
          {/[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(password)
            ? check
            : cross}{' '}
          {t('special')}
        </li>
      </ul>
    </div>
  );
}
