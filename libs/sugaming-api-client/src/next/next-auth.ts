'use server';

import { cookies } from 'next/headers';
import { HttpStatus, UnauthorizedException } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';

export async function login(email: string, password: string) {
  const res = await fetch(`${process.env['API_BASE']}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const response = await res.json();

  if (res.status !== HttpStatus.OK) {
    throw new UnauthorizedException(response);
  }

  const { accessToken, refreshToken } = response;
  setTokens(accessToken, refreshToken);
}

export async function refreshTokens() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refresh_token');

  if (!refreshToken) {
    return;
  }

  const res = await fetch(`${process.env['API_BASE']}/auth/refresh`, {
    method: 'POST',
    headers: {
      authorization: `Refresh ${refreshToken.value}`,
    },
    cache: 'no-store',
  });

  if (res.status !== HttpStatus.OK) {
    return;
  }

  const response = await res.json();
  setTokens(response.accessToken, response.refreshToken);
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
