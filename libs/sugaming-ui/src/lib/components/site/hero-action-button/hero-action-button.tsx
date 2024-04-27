import { getUser } from '@sugaming/sugaming-api-client/next';
import Link from 'next/link';
import React from 'react';
import { useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { FaDiscord } from 'react-icons/fa6';
import { IoSparkles } from 'react-icons/io5';
import { Button } from '../../common/server';

export async function HeroActionButton() {
  const t = await getTranslations('site.hero-action-button');
  const locale = useLocale();
  const user = await getUser();

  if (!user) {
    return (
      <>
        <Button asChild>
          <Link href={`/${locale}/signup`}>{t('join-us')}</Link>
        </Button>

        <Button asChild>
          <Link href={`/${locale}/game-dev/events/sugaming-game-jam-2024`}>
            <IoSparkles className="w-6 h-6 mr-2" />
            SUGAMING GAME JAM 2024
          </Link>
        </Button>
      </>
    );
  }

  if (user && !user.discord) {
    return (
      <>
        <Button asChild>
          <Link
            href={`${process.env.NEXT_PUBLIC_API_BASE}/api/v1/auth/login/discord`}
            target="_blank"
            rel="opener" // Required, so that the new tab can go back to this window
          >
            <FaDiscord className="w-6 h-6 mr-2" />
            {t('join-us-on-discord')}
          </Link>
        </Button>

        <Button asChild>
          <Link href={`/${locale}/game-dev/events/sugaming-game-jam-2024`}>
            <IoSparkles className="w-6 h-6 mr-2" />
            SUGAMING GAME JAM 2024
          </Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <Button asChild>
        <Link
          href={`https://discord.com/channels/${process.env.DISCORD_GUILD_ID}/@home`}
        >
          <FaDiscord className="w-6 h-6 mr-2" />
          {t('go-to-our-discord')}
        </Link>
      </Button>
      <Button asChild>
        <Link href={`/${locale}/game-dev/events/sugaming-game-jam-2024`}>
          <IoSparkles className="w-6 h-6 mr-2" />
          SUGAMING GAME JAM 2024
        </Link>
      </Button>
    </>
  );
}
