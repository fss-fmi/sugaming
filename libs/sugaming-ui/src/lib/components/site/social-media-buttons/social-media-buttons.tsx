import {
  FaFacebook,
  FaInstagram,
  FaThreads,
  FaTwitch,
  FaYoutube,
} from 'react-icons/fa6';
import Link from 'next/link';
import React from 'react';
import { Button } from '../../common/server';

export async function SocialMediaButtons() {
  const socials = [
    {
      name: 'Instagram',
      icon: <FaInstagram className="w-10 h-10" />,
      link: 'https://www.instagram.com/SUGAMING.club',
      className: 'hover:text-[#E1306C] focus:text-[#E1306C]',
    },
    {
      name: 'Facebook',
      icon: <FaFacebook className="w-10 h-10" />,
      link: 'https://www.facebook.com/SUGAMING.club',
      className: 'hover:text-[#1877F2] focus:text-[#1877F2]',
    },
    {
      name: 'Threads',
      icon: <FaThreads className="w-10 h-10" />,
      link: 'https://www.threads.com/SUGAMING.club',
      className: 'hover:text-gray-500 focus:text-gray-500',
    },
    {
      name: 'YouTube',
      icon: <FaYoutube className="w-10 h-10" />,
      link: 'https://www.youtube.com/@SUGAMINGclub',
      className: 'hover:text-[#F60000] focus:text-[#F60000]',
    },
    {
      name: 'Twitch',
      icon: <FaTwitch className="w-10 h-10" />,
      link: 'https://www.twitch.tv/sugamingclub',
      className: 'hover:text-[#8c44f7] focus:text-[#8c44f7]',
    },
  ];
  return (
    <div className="flex items-center">
      {socials.map((social) => (
        <Button key={social.name} variant="link" asChild>
          <Link href={social.link} target="_blank" className={social.className}>
            {social.icon}
          </Link>
        </Button>
      ))}
    </div>
  );
}
