'use client';

import Image from 'next/image';
import React from 'react';
import { useTheme } from 'next-themes';
import { cn } from '../../../utils';

export function Logo(props: React.HTMLAttributes<HTMLDivElement>) {
  // eslint-disable-next-line react/prop-types
  const { className, ...otherProps } = props;
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={cn('flex w-fit items-center gap-1.5', className)}
      {...otherProps}
    >
      <Image
        src="/assets/icons/sugaming-light.png"
        alt="SUGAMING Logo"
        width={32}
        height={32}
        className={resolvedTheme === 'light' ? 'filter invert' : ''}
      />
      <span className="text-xl font-bold">SUGAMING</span>
    </div>
  );
}
export default Logo;
