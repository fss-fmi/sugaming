'use client';

import React, { ReactNode } from 'react';

interface NavbarProps {
  children?: ReactNode;
}

export function Navbar({ children }: NavbarProps) {
  return (
    <nav className="flex sticky bg-white dark:bg-zinc-950 top-0 p-2 justify-between items-center">
      {children}
    </nav>
  );
}

Navbar.defaultProps = {
  children: null,
};
