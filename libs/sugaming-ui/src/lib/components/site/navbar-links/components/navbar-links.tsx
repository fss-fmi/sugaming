'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { NavbarDropdown } from './navbar-dropdown';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../../../common/client';
import { Badge } from '../../../common/server';

interface NavbarLinksProps {
  className: string;
}

export function NavbarLinks({ className }: NavbarLinksProps) {
  const locale = useLocale();
  const t = useTranslations('site.navbar-links');

  const popoverLinks = [
    {
      title: t('league.name'),
      description: t('league.description'),
      href: `/${locale}/league`,
      links: [
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
    },
    {
      title: t('cs2.name'),
      description: t('cs2.description'),
      href: `/${locale}/cs2`,
      links: [
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
    },
    {
      title: t('valorant.name'),
      href: `/${locale}/valorant`,
      badge: t('valorant.coming-soon'),
    },
    {
      title: t('game-dev'),
      href: `/${locale}/game-dev`,
    },
  ];

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {popoverLinks.map((link) => (
          <NavigationMenuItem key={link.title}>
            {link.links ? (
              <Link href={link.href}>
                <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
              </Link>
            ) : (
              <NavigationMenuLink
                href={link.href}
                className={navigationMenuTriggerStyle()}
              >
                {link.title}
                {link.badge && (
                  <Badge variant="secondaryStatic" className="ml-1.5">
                    {link.badge}
                  </Badge>
                )}
              </NavigationMenuLink>
            )}
            {link.links && <NavbarDropdown link={link} />}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
