'use server';

import { HTTP_METHOD } from 'next/dist/server/web/http';
import { cookies } from 'next/headers';
import { refreshTokens } from './next-auth';

export async function apiRequest(method: HTTP_METHOD, endpoint: string) {
  // Get access token from cookies
  const cookieStore = cookies();
  let accessToken = cookieStore.get('access_token');

  // Refresh existing access and refresh tokens if the access token is expired
  if (!accessToken) {
    await refreshTokens();
    accessToken = cookieStore.get('access_token');
  }

  // Make the request to the api
  const res = await fetch(`${process.env['API_BASE']}/${endpoint}`, {
    method,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken.value}` : '',
      'Accept-Language': 'bg', // TODO: add localization to the site itself
    },
  });

  return {
    status: res.status,
    json: await res.json(),
  };
}
