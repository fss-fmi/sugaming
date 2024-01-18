import React from 'react';
import { NavbarDropdownItem } from './navbar-dropdown-item';
import {
  NavigationMenuContent,
  NavigationMenuLink,
} from '../../../common/client';

interface NavbarDropdownProps {
  link: {
    title: string;
    href: string;
    links?: {
      isFeatured: boolean;
      title: string;
      description: string;
      href: string;
    }[];
  };
}

export function NavbarDropdown({ link }: NavbarDropdownProps) {
  return (
    <NavigationMenuContent>
      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
        {link.links &&
          link.links.map((component) =>
            component.isFeatured ? (
              <li key={component.title} className="row-span-3">
                <NavigationMenuLink asChild key={component.title}>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href={component.href}
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {component.title}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {component.description}
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            ) : (
              <NavbarDropdownItem
                key={component.title}
                title={component.title}
                href={component.href}
              >
                {component.description}
              </NavbarDropdownItem>
            ),
          )}
      </ul>
    </NavigationMenuContent>
  );
}
