import { useLocale, useTranslations } from 'next-intl';
import { NavbarLinksDesktop } from './components/navbar-links-desktop';
import { NavbarLinksMobile } from './components/navbar-links-mobile';

interface NavbarLinksProps {
  variant: 'desktop' | 'mobile';
  className: string;
}
export function NavbarLinks({ className, variant }: NavbarLinksProps) {
  const locale = useLocale();
  const t = useTranslations('site.navbar-links');

  const links = [
    {
      title: t('league.name'),
      href: `/${locale}/league`,
      links: [
        {
          isFeatured: true,
          title: t('league.name'),
          description: t('league.description'),
          href: `/${locale}/league`,
        },
        {
          isFeatured: false,
          title: t('league.tournaments.name'),
          description: t('league.tournaments.description'),
          href: `/${locale}/league/tournaments`,
        },
        {
          isFeatured: false,
          title: t('league.matches.name'),
          description: t('league.matches.description'),
          href: `/${locale}/league/matches`,
        },
        {
          isFeatured: false,
          title: t('league.teams.name'),
          description: t('league.teams.description'),
          href: `/${locale}/league/teams`,
        },
      ],
    },
    {
      title: t('cs2.name'),
      href: `/${locale}/cs2`,
      links: [
        {
          isFeatured: true,
          title: t('cs2.name'),
          description: t('cs2.description'),
          href: `/${locale}/cs2`,
        },
        {
          isFeatured: false,
          title: t('cs2.tournaments.name'),
          description: t('cs2.tournaments.description'),
          href: `/${locale}/cs2/tournaments`,
        },
        {
          isFeatured: false,
          title: t('cs2.matches.name'),
          description: t('cs2.matches.description'),
          href: `/${locale}/cs2/matches`,
        },
        {
          isFeatured: false,
          title: t('cs2.teams.name'),
          description: t('cs2.teams.description'),
          href: `/${locale}/cs2/teams`,
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

  if (variant === 'desktop') {
    return <NavbarLinksDesktop className={className} links={links} />;
  }

  if (variant === 'mobile') {
    return <NavbarLinksMobile className={className} links={links} />;
  }
}
