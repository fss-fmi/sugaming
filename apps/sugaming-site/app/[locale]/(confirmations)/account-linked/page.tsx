'use client';

import {
  Button,
  Card,
  CardContent,
  CardFooter,
} from '@sugaming/sugaming-ui/lib/components/common/server';
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaDiscord, FaSteam } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';

export default function AccountLinkedPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const error = searchParams.get('error');

  const t = useTranslations('account-linked-page');

  const secondsBeforeRedirect = 5;
  const [timerCounter, setTimerCounter] = React.useState(secondsBeforeRedirect);

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

  useEffect(() => {
    // Close the current window after 5 seconds
    const timer = setTimeout(() => {
      switchFocusToOpener();
    }, secondsBeforeRedirect * 1000);

    // Clean up the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    // Update the timer counter every second
    const interval = setInterval(() => {
      setTimerCounter((prev) => prev - 1);
    }, 1000);

    // Clean up the interval to avoid memory leaks
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="flex m-auto w-[450px] flex-col items-center p-4 md:p-8 space-y-4">
      <CardContent className="flex flex-col space-y-2 h-1/6 justify-end text-center">
        {type === 'discord' && <FaDiscord className="h-52 w-52 m-auto" />}
        {type === 'steam' && <FaSteam className="h-52 w-52 m-auto" />}

        {!error ? (
          <>
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('title-success')}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t('description-success')}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('title-error')}
            </h1>
            <p className="text-md text-red-400 text-muted-foreground">
              {error}
            </p>
          </>
        )}
      </CardContent>

      <CardFooter>
        <div className="w-full h-5/6">
          <Button onClick={switchFocusToOpener}>
            {t('close')} ({timerCounter})
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
