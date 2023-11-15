'use server';

import { cookies } from 'next/headers';
import { HttpStatus, UnauthorizedException } from '@nestjs/common';

export async function login(email: string, password: string) {
  const res = await fetch(`${process.env['API_BASE']}/v1/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const response = await res.json();

  if (res.status !== HttpStatus.OK) {
    throw new UnauthorizedException(response);
  }

  const cookieStore = cookies();
  cookieStore.set('access_token', response.accessToken);
  cookieStore.set('refresh_token', response.refreshToken);
}

export async function refreshAccessToken() {
  // TODO: implement
}
