import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@sugaming/sugaming-ui/lib/components/common/server';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { getTranslations } from 'next-intl/server';
import { SponsorsShowcase } from '@sugaming/sugaming-ui/lib/components/site/sponsors-showcase/sponsors-showcase';

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
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

      <SponsorsShowcase
        sponsors={await ApiClient.SponsorsApiService.sponsorsControllerGetV1(
          {},
        )}
      />
    </>
  );
}
