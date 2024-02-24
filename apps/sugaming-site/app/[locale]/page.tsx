'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@sugaming/sugaming-ui/lib/components/common/server';
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa6';

export default function Index() {
  const t = useTranslations('Index');

  return (
    <>
      <h1>{t('title')}</h1>

      <Button variant="outline" type="button" asChild>
        <Link href="http://localhost:3000/api/v1/auth/login/discord">
          <FaDiscord className="mr-2 h-4 w-4" />
          Discord
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
}
