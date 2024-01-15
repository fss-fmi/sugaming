import * as React from 'react';
import { cn } from '../../../../utils';

type SheetHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

export function SheetHeader({ className = '', ...props }: SheetHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-2 text-center sm:text-left',
        className,
      )}
      {...props}
    />
  );
}
SheetHeader.displayName = 'SheetHeader';
