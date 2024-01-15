import * as React from 'react';
import { cn } from '../../../../utils';

type SheetFooterProps = React.HTMLAttributes<HTMLDivElement> & {
  // eslint-disable-next-line react/require-default-props
  className?: string;
};

export function SheetFooter({ className = '', ...props }: SheetFooterProps) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className,
      )}
      {...props}
    />
  );
}
SheetFooter.displayName = 'SheetFooter';
