import { NavbarLinksDesktop } from './components/navbar-links-desktop';
import { NavbarLinksMobile } from './components/navbar-links-mobile';

interface NavbarLinksProps {
  variant: 'desktop' | 'mobile';
  className: string;
}
export function NavbarLinks({ className, variant }: NavbarLinksProps) {
  const links = [];

  if (variant === 'desktop') {
    return <NavbarLinksDesktop className={className} links={links} />;
  }

  if (variant === 'mobile') {
    return <NavbarLinksMobile className={className} links={links} />;
  }
}
