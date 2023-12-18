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
    description?: string;
    links?: {
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
        <li className="row-span-3">
          <NavigationMenuLink asChild>
            <a
              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
              href={link.href}
            >
              <div className="mb-2 mt-4 text-lg font-medium">{link.title}</div>
              <p className="text-sm leading-tight text-muted-foreground">
                {link.description}
              </p>
            </a>
          </NavigationMenuLink>
        </li>
        {link.links &&
          link.links.map((component) => (
            <NavbarDropdownItem
              key={component.title}
              title={component.title}
              href={component.href}
            >
              {component.description}
            </NavbarDropdownItem>
          ))}
      </ul>
    </NavigationMenuContent>
  );
}
