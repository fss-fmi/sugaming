'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Badge } from '../../common/badge/badge';
import { cn } from '../../../utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../../common/client';

export function NavbarLinks() {
  const locale = useLocale();
  const t = useTranslations('Site.NavbarLinks');

  const popoverLinks = {
    league: [
      {
        title: t('league.tournaments.name'),
        description: t('league.tournaments.description'),
        href: `/${locale}/league/tournaments`,
      },
      {
        title: t('league.matches.name'),
        description: t('league.matches.description'),
        href: `/${locale}/league/matches`,
      },
      {
        title: t('league.ranking.name'),
        description: t('league.ranking.description'),
        href: `/${locale}/league/ranking`,
      },
    ],
    cs2: [
      {
        title: t('cs2.tournaments.name'),
        description: t('cs2.tournaments.description'),
        href: `/${locale}/cs2/tournaments`,
      },
      {
        title: t('cs2.matches.name'),
        description: t('cs2.matches.description'),
        href: `/${locale}/cs2/matches`,
      },
      {
        title: t('cs2.ranking.name'),
        description: t('cs2.ranking.description'),
        href: `/${locale}/cs2/ranking`,
      },
    ],
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {t('home')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href={`/${locale}/league`}>
            <NavigationMenuTrigger>{t('league.name')}</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href={`/${locale}/league`}
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {t('league.name')}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {t('league.description')}
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {popoverLinks.league.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href={`/${locale}/cs2`}>
            <NavigationMenuTrigger>{t('cs2.name')}</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href={`/${locale}/cs2`}
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {t('cs2.name')}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {t('cs2.description')}
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {popoverLinks.cs2.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href={`/${locale}/valorant`} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <span>
                {`${t('valorant.name')} `}
                <Badge variant="secondaryStatic" className="ml-1.5">
                  {t('valorant.coming-soon')}
                </Badge>
              </span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href={`/${locale}/game-dev`} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <span>{t('game-dev')}</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
  // eslint-disable-next-line react/prop-types
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
