'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { useTranslations } from 'next-intl';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '../../../utils';
import { Label } from '../label/label';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('Common.ThemeSwitcher');

  return (
    <div className="relative inline-block pb-5">
      <div className="relative flex items-center h-5">
        {/* Light mode section */}
        <Label
          className="h-6 pr-6 z-10 relative flex uppercase items-center"
          htmlFor="theme-switcher-light"
        >
          🌞 {t('light')}
          <input
            id="theme-switcher-light"
            value="light"
            type="radio"
            checked={theme === 'light'}
            className="opacity-0 absolute block w-full h-full inset-0 cursor-pointer"
            onClick={() => setTheme('light')}
            onChange={() => {}}
          />
        </Label>

        {/* Slider */}
        <div className="relative w-0 -left-5 top-1">
          <SwitchPrimitives.Root
            className={cn(
              'peer inline-flex h-5 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-zinc-900 data-[state=unchecked]:bg-zinc-200 dark:focus-visible:ring-zinc-300 dark:focus-visible:ring-offset-zinc-950 dark:data-[state=checked]:bg-zinc-50 dark:data-[state=unchecked]:bg-zinc-800',
            )}
          />
          <div
            className={cn(
              'transition-all duration-300 ease-in-out absolute top-0.5 left-4 w-4 h-4 bg-zinc-950 dark:bg-white ring-0 shadow-lg rounded-full',
              theme === 'light' ? 'left-1' : '',
              theme === 'system' ? 'left-6' : '',
              theme === 'dark' ? 'left-11' : '',
            )}
          />
        </div>

        {/* System mode section */}
        <Label
          className="w-6 h-6 z-10  relative uppercase"
          htmlFor="theme-switcher-auto"
        >
          <span className="flex relative justify-center top-7 transform cursor-pointer">
            {t('system')}
          </span>
          <input
            id="theme-switcher-auto"
            value="auto"
            type="radio"
            checked={theme === 'system'}
            className="opacity-0 absolute block w-full h-full inset-0 cursor-pointer"
            onClick={() => setTheme('system')}
            onChange={() => {}}
          />
        </Label>

        {/* Dark mode section */}
        <Label
          className="h-6 pl-6 z-10 relative flex uppercase items-center"
          htmlFor="theme-switcher-dark"
        >
          {t('dark')} 🌚
          <input
            id="theme-switcher-dark"
            value="dark"
            type="radio"
            checked={theme === 'dark'}
            className="opacity-0 absolute block w-full h-full inset-0 cursor-pointer"
            onClick={() => setTheme('dark')}
            onChange={() => {}}
          />
        </Label>
      </div>
    </div>
  );
}
