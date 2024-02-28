'use client';

import { FaUserPlus } from 'react-icons/fa6';
import React, { useState } from 'react';
import { getBearerToken } from '@sugaming/sugaming-api-client/next';
import { Button } from '../../../common/server';

interface InviteButtonProps {
  userId: string;
  teamId: string;
}

enum ButtonState {
  NotClicked,
  ClickedSuccess,
  ClickedError,
}

export function InviteButton({ userId, teamId }: InviteButtonProps) {
  // const t = useTranslations('');
  const [buttonState, setButtonState] = useState<ButtonState>(
    ButtonState.NotClicked,
  );
  async function inviteUser() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/users/${userId}/cs2-team-invites`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await getBearerToken(),
        },
        body: JSON.stringify({ id: teamId }),
      },
    );

    // Handle success
    if (response.ok) {
      setButtonState(ButtonState.ClickedSuccess);
      return;
    }

    // Handle errors
    const json = await response.json();
    setButtonState(ButtonState.ClickedError);
    // toast({
    //   variant: 'destructive',
    //   title: json.message || "t('error-occurred')",
    //   description: "t('try-again')",
    // });
  }

  async function renderButton() {
    switch (buttonState) {
      case ButtonState.NotClicked: {
        return (
          <Button variant="outline" onClick={() => inviteUser()}>
            <FaUserPlus />
          </Button>
        );
      }
      case ButtonState.ClickedSuccess: {
        return <p>Success</p>;
      }
      case ButtonState.ClickedError: {
        return <p>Error</p>;
      }
      default: {
        return null;
      }
    }
  }

  return renderButton();
}
