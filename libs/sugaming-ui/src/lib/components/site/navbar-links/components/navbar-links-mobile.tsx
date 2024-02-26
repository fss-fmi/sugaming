'use client';

import React from 'react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Button } from '../../../common/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../../common/client';
import { Logo } from '../../server';

interface NavbarLinksMobileProps {
  className: string;
  links: {
    title: string;
    href: string;
    description?: string;
    badge?: string;
    links?: {
      title: string;
      description: string;
      href: string;
    }[];
  }[];
}

export function NavbarLinksMobile({
  className,
  links,
}: NavbarLinksMobileProps) {
  return (
    <Sheet>
      <Button variant="ghost" size="icon" asChild>
        <SheetTrigger className={className}>
          <HamburgerMenuIcon />
        </SheetTrigger>
      </Button>
      <SheetContent side="left" className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full pr-4">
          {links.map((link) =>
            link.links ? (
              <Accordion key={link.title} type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>{link.title}</AccordionTrigger>
                  <AccordionContent>
                    {link.links?.map((subLink) => (
                      <Link
                        key={subLink.title}
                        href={subLink.href}
                        className="flex flex-1 items-center justify-between py-4 pl-4 text-sm font-medium transition-all hover:underline"
                      >
                        {subLink.title}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                key={link.title}
                href={link.href}
                className="flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline"
              >
                {link.title}
              </Link>
            ),
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
