'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '../../../utils';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('Common.ThemeSwitcher');

  return (
    <div className="relative inline-block pb-5">
      <div className="relative flex items-center h-4">
        {/* Light mode section */}
        <label
          className="h-6 pr-5 z-10 relative flex"
          htmlFor="theme-switcher-light"
        >
          <span className="uppercase cursor-pointer w-fit">
            🌞 {t('light')}
          </span>
          <input
            id="theme-switcher-light"
            value="light"
            type="radio"
            checked={theme === 'light'}
            className="opacity-0 absolute block w-full h-full inset-0 cursor-pointer"
            onClick={() => setTheme('light')}
            onChange={() => {}}
          />
        </label>

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
        <label className="w-4 h-6 z-10 relative" htmlFor="theme-switcher-auto">
          <span className="flex relative justify-center top-5 transform uppercase cursor-pointer">
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
        </label>

        {/* Dark mode section */}
        <label
          className="h-6 pl-5 relative flex items-center"
          htmlFor="theme-switcher-dark"
        >
          <span className="uppercase cursor-pointer w-fit">{t('dark')} 🌚</span>
          <input
            id="theme-switcher-dark"
            value="dark"
            type="radio"
            checked={theme === 'dark'}
            className="opacity-0 absolute block w-full h-full inset-0 cursor-pointer"
            onClick={() => setTheme('dark')}
            onChange={() => {}}
          />
        </label>
      </div>
    </div>
  );
}
