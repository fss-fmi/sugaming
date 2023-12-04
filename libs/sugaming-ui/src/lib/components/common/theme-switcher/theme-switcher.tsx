'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '../../../utils';
import { Label } from '../label/label';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('Common.ThemeSwitcher');

  return (
    <div className="relative inline-block pb-5">
      <div className="relative flex items-center h-4">
        {/* Light mode section */}
        <Label
          className="pr-5 z-10 relative flex uppercase"
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
        <div className="relative top-0 w-0 -left-4">
          <div className="w-12 h-4 bg-gray-600 rounded-full shadow-inner" />
          <div
            className={cn(
              'transition-all duration-300 ease-in-out absolute top-0 left-4 w-4 h-4 bg-white border-2 border-gray-800 rounded-full',
              theme === 'light' ? 'left-0' : '',
              theme === 'system' ? 'left-4' : '',
              theme === 'dark' ? 'left-8' : '',
            )}
          />
        </div>

        {/* System mode section */}
        <Label
          className="w-4 z-10 relative uppercase"
          htmlFor="theme-switcher-auto"
        >
          <span className="flex relative justify-center top-5 transform cursor-pointer">
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
          className="pl-5 relative flex items-center uppercase"
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
