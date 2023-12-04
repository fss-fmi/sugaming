import * as React from 'react';
import { cn } from '../../../../utils';

type CardTitleProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {props.children}
    </h3>
  ),
);

CardTitle.displayName = 'CardTitle';
CardTitle.defaultProps = {
  className: '',
};
