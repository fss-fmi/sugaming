import {
  FaFacebook,
  FaInstagram,
  FaThreads,
  FaTwitch,
  FaYoutube,
} from 'react-icons/fa6';
import Link from 'next/link';
import React from 'react';
import { cn } from '../../../utils';
import { Button } from '../../common/server';

export async function SocialMediaButtons() {
  const socials = [
    {
      name: 'Instagram',
      icon: <FaInstagram className="w-8 h-8" />,
      link: 'https://www.instagram.com/SUGAMING.club',
      className: 'hover:text-[#E1306C] focus:text-[#E1306C]',
    },
    {
      name: 'Facebook',
      icon: <FaFacebook className="w-8 h-8" />,
      link: 'https://www.facebook.com/SUGAMING.club',
      className: 'hover:text-[#1877F2] focus:text-[#1877F2]',
    },
    {
      name: 'Threads',
      icon: <FaThreads className="w-8 h-8" />,
      link: 'https://www.threads.net/SUGAMING.club',
      className: 'hover:text-gray-500 focus:text-gray-500',
    },
    {
      name: 'YouTube',
      icon: <FaYoutube className="w-8 h-8" />,
      link: 'https://www.youtube.com/@SUGAMINGclub',
      className: 'hover:text-[#F60000] focus:text-[#F60000]',
    },
    {
      name: 'Twitch',
      icon: <FaTwitch className="w-8 h-8" />,
      link: 'https://www.twitch.tv/sugaming_club',
      className: 'hover:text-[#8c44f7] focus:text-[#8c44f7]',
    },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {socials.map((social) => (
        <Button className="p-2" key={social.name} variant="link" asChild>
          <Link
            href={social.link}
            target="_blank"
            className={cn('transition-300', social.className)}
          >
            {social.icon}
            <span className="sr-only">{social.name}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
}
