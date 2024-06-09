import { useLocale } from 'next-intl';
import { getUser } from '@sugaming/sugaming-api-client/next';
import { redirect, RedirectType } from 'next/navigation';
import { Card } from '@sugaming/sugaming-ui/lib/components/common/card/components/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@sugaming/sugaming-ui/lib/components/common/client';

export default async function ProfilePage() {
  const locale = useLocale();
  const user = await getUser();

  if (!user) {
    redirect(`/${locale}/login`, RedirectType.replace);
  }

  return (
    <Card className="mx-auto mt-10 grid lg:grid-cols-[2fr_3fr] w-full flex-col items-stretch overflow-hidden">
      <div className="p-8 flex flex-row lg:flex-col justify-center items-center text-center w-full h-full bg-muted lg:space-y-2">
        <Avatar className="w-24 lg:w-1/2 h-auto aspect-square bg-background border-2 border-muted-foreground">
          <AvatarImage
            src={user.avatarUrl}
            alt={`${user.firstName} ${user.lastName}`}
          />
          <AvatarFallback>
            {user.firstName[0]}
            {user.lastName[0]}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1 w-full">
          <h4 className="text-xl font-semibold">{user.nickname}</h4>
          <p className="text-md">
            {user.firstName} {user.lastName}
          </p>
        </div>
      </div>

      <div className="p-8 aspect-square grid grid-rows-[1fr_1fr_8fr_1fr] h-full">
        <h1 className="text-xl sm:text-2xl md:text-4xl uppercase">
          {user.nickname}
        </h1>
      </div>
    </Card>
  );
}
