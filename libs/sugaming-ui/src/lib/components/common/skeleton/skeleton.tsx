import React from 'react';
import { cn } from '../../../utils';

function Skeleton({
  // eslint-disable-next-line react/prop-types
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-primary/10', className)}
      {...props}
    />
  );
}

export { Skeleton };
