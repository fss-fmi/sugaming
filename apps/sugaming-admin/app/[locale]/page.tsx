import { useTranslations } from 'next-intl';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Switch,
} from '@sugaming/sugaming-ui/lib/components/common/server';

export default function Index() {
  const t = useTranslations('Index');

  return (
    <>
      <div>
        <h1>{t('title')}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
          <Switch />
          {/* <ThemeSwitcher /> */}
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
}
