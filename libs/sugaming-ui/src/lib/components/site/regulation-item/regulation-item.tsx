'use client';

import { ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../common/client';

interface RegulationItemProps {
  title: string;
  content: ReactNode;
}

export function RegulationItem({ title, content }: RegulationItemProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-xl">{title}</AccordionTrigger>
        <AccordionContent className="flex flex-col space-y-4 text-lg">
          {content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
