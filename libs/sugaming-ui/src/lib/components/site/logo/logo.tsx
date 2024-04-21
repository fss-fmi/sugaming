'use client';

import Image from 'next/image';
import React from 'react';
import { useTheme } from 'next-themes';
import { Inter_Tight } from 'next/font/google';
import { cn } from '../../../utils';

const titleFont = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  weight: '900',
});

type LogoProps = React.HTMLAttributes<HTMLDivElement> & {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  // eslint-disable-next-line react/require-default-props
  showText?: boolean;
  // eslint-disable-next-line react/require-default-props
  size?: number;
};

export function Logo({
  className = '',
  size = 32,
  showText = true,
  ...otherProps
}: LogoProps) {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={cn('flex w-fit items-center gap-1.5', className)}
      {...otherProps}
    >
      <Image
        src="/assets/icons/sugaming-light.png"
        alt="SUGAMING Logo"
        width={size}
        height={size}
        className={cn(
          resolvedTheme === 'light' ? 'filter invert' : '',
          'w-fit',
        )}
      />
      {showText && (
        <span className={cn(titleFont.className, 'text-xl')}>SUGAMING</span>
      )}
    </div>
  );
}

export default Logo;
