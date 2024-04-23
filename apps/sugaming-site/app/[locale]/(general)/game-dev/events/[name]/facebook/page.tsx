import { redirect } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { ApiClient } from '@sugaming/sugaming-api-client/client';

interface GameDevEventPageProps {
  params: { name: string };
}

export default async function GameDevEventsFacebookEventPage({
  params,
}: GameDevEventPageProps) {
  const eventName = params.name;
  const event =
    await ApiClient.GameDevEventsApiService.gameDevEventsControllerGetGameDevEventV1(
      { eventName },
    );
  redirect(event.facebookEventUrl);
}
