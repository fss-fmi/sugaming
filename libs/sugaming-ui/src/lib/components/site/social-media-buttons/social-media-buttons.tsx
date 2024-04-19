import { FaFacebook, FaInstagram, FaTwitch, FaYoutube } from 'react-icons/fa6';
import Link from 'next/link';
import React from 'react';
import { Button } from '../../common/server';

export async function SocialMediaButtons() {
  const socials = [
    {
      name: 'Instagram',
      icon: <FaInstagram className="w-6 h-6" />,
      link: 'https://www.instagram.com/SUGAMING.club',
      color: '#E1306C',
    },
    {
      name: 'Facebook',
      icon: <FaFacebook className="w-6 h-6" />,
      link: 'https://www.facebook.com/SUGAMING.club',
      color: '#1877F2',
    },
    {
      name: 'YouTube',
      icon: <FaYoutube className="w-6 h-6" />,
      link: 'https://www.youtube.com/@SUGAMINGclub',
      color: '#F60000',
    },
    {
      name: 'Twitch',
      icon: <FaTwitch className="w-6 h-6" />,
      link: 'https://www.twitch.tv/sugamingclub',
      color: '#8C44F7',
    },
  ];
  return (
    <div className="flex items-center">
      {socials.map((social) => (
        <Button key={social.name} variant="link" asChild>
          <Link
            href={social.link}
            target="_blank"
            style={{ color: social.color }}
          >
            {social.icon}
          </Link>
        </Button>
      ))}
    </div>
  );
}
