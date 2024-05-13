import '../../global.css';
import '@sugaming/sugaming-ui/global.css';

import React from 'react';

export default async function ConfirmationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen items-center justify-center">
      {children}
    </main>
  );
}
