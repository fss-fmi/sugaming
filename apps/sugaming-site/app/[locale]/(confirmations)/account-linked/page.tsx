'use client';

import {
  Card,
  CardFooter,
} from '@sugaming/sugaming-ui/lib/components/common/server';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// interface AccountLinkedPageProps {
//   searchParams?: { [key: string]: string | string[] | undefined };
// }

export default function AccountLinkedPage() {
  const router = useRouter();

  useEffect(() => {
    // Function to switch focus back to the opener window/tab
    const switchFocusToOpener = () => {
      if (window.opener && !window.opener.closed) {
        window.opener.focus();
        window.close();
      } else {
        // If opener window/tab is closed or doesn't exist, navigate to a fallback URL
        router.push('/');
      }
    };

    // // Close the current window after 5 seconds
    const timer = setTimeout(() => {
      switchFocusToOpener();
    }, 5000);

    // Clean up the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Card className="flex mx-auto mt-10 h-5/6 w-1/2 md:w-1/3 flex-col items-center p-4 md:p-8 space-y-4">
      <div className="flex flex-col space-y-2 h-1/6 justify-end text-center">
        <h1 className="text-2xl font-semibold tracking-tight">title</h1>
        <p className="text-sm text-muted-foreground">description</p>
      </div>

      <CardFooter>
        <div className="w-full h-5/6">gosho</div>
      </CardFooter>
    </Card>
  );
}
