import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@sugaming/sugaming-ui/lib/components/common/server';
import { getTranslations } from 'next-intl/server';
import { SocialMediaButtons } from '@sugaming/sugaming-ui/lib/components/site/social-media-buttons/social-media-buttons';

export default async function Index() {
  const t = await getTranslations('Index');

  return (
    <>
      <h1>{t('title')}</h1>

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
          <SocialMediaButtons />
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
}
