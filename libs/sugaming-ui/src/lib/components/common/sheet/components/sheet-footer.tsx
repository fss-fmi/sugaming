import * as React from 'react';
import { cn } from '../../../../utils';

type SheetFooterProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export function SheetFooter({ className, ...props }: SheetFooterProps) {
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
SheetFooter.defaultProps = {
  className: '',
};
