'use client';

import { apiRequest, login } from '@sugaming/sugaming-api-client';
import { useState } from 'react';

export default function Index() {
  const [userInfo, setUserInfo] = useState();
  const handleClick = async () => {
    await login('gosho@losho.com', 'GoshoLoshoTestPassword');
    const res = await apiRequest('GET', 'users/profile');
    setUserInfo(res.json);
  };

  return (
    <>
      <h1>Page</h1>

      <button type="button" onClick={handleClick}>
        execute server action
      </button>
    </>
  );
}
