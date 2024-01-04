'use client';

import React, { useState } from 'react';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { getAuth, login } from '@sugaming/sugaming-api-client/next';
import { useTranslations } from 'next-intl';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  ThemeSwitcher,
} from '@sugaming/sugaming-ui/lib/components/common/server';
import { GearIcon } from '@radix-ui/react-icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@sugaming/sugaming-ui/lib/components/common/client';

export default function Index() {
  const t = useTranslations('Index');
  const [userInfo, setUserInfo] = useState<ApiClient.UserDto>();

  const handleClick = async () => {
    await login('gosho@losho.com', 'GoshoLoshoTestPassword');
    const res = await ApiClient.UsersApiService.usersControllerGetCurrentV1({
      authorization: await getAuth(),
    });
    setUserInfo(res);
  };

  return (
    <>
      <h1>{t('title')}</h1>

      <Button variant="default" onClick={handleClick}>
        execute server action
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <GearIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-screen sm:w-80">
          <Label>Theme</Label>
          <div className="flex w-full justify-center p-2">
            <ThemeSwitcher />
          </div>
        </PopoverContent>
      </Popover>

      <p>{userInfo?.firstName}</p>
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
