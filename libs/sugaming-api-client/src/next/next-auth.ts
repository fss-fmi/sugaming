'use server';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { ApiClient } from '../client';

export async function login(email: string, password: string) {
  const response = await ApiClient.AuthApiService.authControllerPostLoginV1({
    requestBody: {
      email,
      password,
      ...{ date: new Date().toDateString() }, // TODO: this is a hacky fix for disabling caching; find a better way to implement this
    },
    cacheControl: 'no-cache',
    pragma: 'no-cache',
    expires: '0',
  });

  const { accessToken, refreshToken } = response;
  const cookieStore = cookies();
  setTokens(cookieStore, accessToken, refreshToken);
}

export async function getRefreshedTokens() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refresh_token');

  if (!refreshToken) {
    return null;
  }

  return ApiClient.AuthApiService.authControllerPostRefreshV1({
    authorization: `Refresh ${refreshToken.value}`,
    cacheControl: 'no-cache',
    pragma: 'no-cache',
    expires: '0',
  });
}

export async function refreshTokens(cookieStore: ResponseCookies) {
  const refreshedTokens = await getRefreshedTokens();
  if (refreshedTokens) {
    setTokens(
      cookieStore,
      refreshedTokens.accessToken,
      refreshedTokens.refreshToken,
    );
  }
}

export async function getAuth() {
  // Get access token from cookies
  const cookieStore = cookies();
  let accessToken = cookieStore.get('access_token');

  // Refresh existing access and refresh tokens if the access token is expired
  if (!accessToken) {
    // await refreshTokens();
    accessToken = cookieStore.get('access_token');
  }

  return accessToken;
}

export async function getBearerToken() {
  const accessToken = await getAuth();

  if (!accessToken) {
    return undefined;
  }

  return `Bearer ${accessToken.value}`;
}

export async function getUser() {
  // Get current authentication
  const bearerToken = await getBearerToken();

  try {
    return await ApiClient.UsersApiService.usersControllerGetCurrentV1({
      authorization: bearerToken,
    });
  } catch (ApiError) {
    return undefined;
  }
}

function setTokens(
  cookieStore: ResponseCookies,
  accessToken: string,
  refreshToken: string,
) {
  const decodedAccessToken = jwtDecode(accessToken);
  const accessTokenExp = decodedAccessToken.exp;

  const decodedRefreshToken = jwtDecode(refreshToken);
  const refreshTokenExp = decodedRefreshToken.exp;

  cookieStore.set('access_token', accessToken, {
    expires: accessTokenExp ? accessTokenExp * 1000 : undefined,
  });
  cookieStore.set('refresh_token', refreshToken, {
    expires: refreshTokenExp ? refreshTokenExp * 1000 : undefined,
  });
}
