import { SocialMediaButtons } from '../social-media-buttons/social-media-buttons';
import { Card } from '../../common/server';
import { Logo } from '../logo/logo';

export function Footer() {
  return (
    <footer className="max-w-[88rem] p-4  m-auto">
      <Card className="w-full  mx-auto flex flex-col items-center justify-between gap-6 p-4 sm:flex-row sm:gap-0">
        <Logo />
        <SocialMediaButtons />
      </Card>
    </footer>
  );
}
