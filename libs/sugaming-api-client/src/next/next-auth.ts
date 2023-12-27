'use server';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { ApiClient } from '../client';

export async function login(email: string, password: string) {
  const response = await ApiClient.AuthApiService.authControllerPostLoginV1({
    requestBody: {
      email,
      password,
    },
  });

  const { accessToken, refreshToken } = response;
  setTokens(accessToken, refreshToken);
}

export async function refreshTokens() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refresh_token');

  if (!refreshToken) {
    return;
  }

  const response = await ApiClient.AuthApiService.authControllerPostRefreshV1({
    authorization: `Refresh ${refreshToken.value}`,
  });

  setTokens(response.accessToken, response.refreshToken);
}

export async function getAuth() {
  // Get access token from cookies
  const cookieStore = cookies();
  let accessToken = cookieStore.get('access_token');

  // Refresh existing access and refresh tokens if the access token is expired
  if (!accessToken) {
    await refreshTokens();
    accessToken = cookieStore.get('access_token');
  }

  if (!accessToken) {
    return undefined;
  }

  return `Bearer ${accessToken.value}`;
}

function setTokens(accessToken: string, refreshToken: string) {
  const decodedAccessToken = jwtDecode(accessToken);
  const accessTokenExp = decodedAccessToken.exp;

  const decodedRefreshToken = jwtDecode(refreshToken);
  const refreshTokenExp = decodedRefreshToken.exp;

  const cookieStore = cookies();
  cookieStore.set('access_token', accessToken, {
    expires: accessTokenExp ? accessTokenExp * 1000 : undefined,
  });
  cookieStore.set('refresh_token', refreshToken, {
    expires: refreshTokenExp ? refreshTokenExp * 1000 : undefined,
  });
}
