'use client';

import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface VideoPlayerProps {
  url: string;
  // eslint-disable-next-line react/require-default-props
  className?: string;
}

export function VideoPlayer({ url, className = '' }: VideoPlayerProps) {
  return (
    <ReactPlayer
      className={className}
      url={url}
      playing
      muted
      loop
      width="100%"
      height="100%"
    />
  );
}
