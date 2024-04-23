'use client';

import React, { ReactNode } from 'react';

interface NavbarProps {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
}

export function Navbar({ children }: NavbarProps) {
  return (
    <nav className="grid grid-cols-3 grid-flow-col sticky bg-white dark:bg-zinc-950 top-0 p-2 items-center z-40 w-full">
      {children}
    </nav>
  );
}
