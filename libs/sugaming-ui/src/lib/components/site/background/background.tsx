'use client';

import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { useTheme } from 'next-themes';
import { cn } from '../../../utils';

export function Background() {
  const { resolvedTheme } = useTheme();
  const lightBackgroundContainer = useRef(null);
  const darkBackgroundContainer = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: lightBackgroundContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/animations/damascus-background-fast.json',
    });

    lottie.loadAnimation({
      container: darkBackgroundContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/animations/damascus-background-fast-dark.json',
    });
  }, []);

  return (
    <>
      <svg
        ref={lightBackgroundContainer}
        className={cn(
          'w-[100vw] h-[100vh] fixed top-0 -z-50 overflow-hidden',
          resolvedTheme !== 'light' ? 'hidden' : '',
        )}
      />

      <svg
        ref={darkBackgroundContainer}
        className={cn(
          'w-[100vw] h-[100vh] fixed top-0 -z-50 overflow-hidden',
          resolvedTheme !== 'dark' ? 'hidden' : '',
        )}
      />
    </>
  );
}
