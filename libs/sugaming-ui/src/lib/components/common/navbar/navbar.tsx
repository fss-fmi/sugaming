import React, { ReactNode } from 'react';

interface NavbarProps {
  children?: ReactNode;
}

export function Navbar({ children }: NavbarProps) {
  return (
    <div className="flex p-2 justify-between items-center">{children}</div>
  );
}

Navbar.defaultProps = {
  children: null,
};
