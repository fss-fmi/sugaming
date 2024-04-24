import { getLocale } from 'next-intl/server';
import { NavbarLinksDesktop } from './components/navbar-links-desktop';
import { NavbarLinksMobile } from './components/navbar-links-mobile';

interface NavbarLinksProps {
  variant: 'desktop' | 'mobile';
  className: string;
}
export async function NavbarLinks({ className, variant }: NavbarLinksProps) {
  const locale = await getLocale();
  const links = [
    {
      title: 'SUGAMING GAME JAM 2024',
      href: `/${locale}/game-dev/events/sugaming-game-jam-2024`,
    },
  ];

  if (variant === 'desktop') {
    return <NavbarLinksDesktop className={className} links={links} />;
  }

  if (variant === 'mobile') {
    return <NavbarLinksMobile className={className} links={links} />;
  }
}
