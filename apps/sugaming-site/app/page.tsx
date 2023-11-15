'use client';

import { login, refreshAccessToken } from '@sugaming/sugaming-api-client';

export default function Index() {
  const handleClick = async () => {
    await login('gosho@losho.com', 'GoshoLoshoTestPassword');
    await refreshAccessToken();
  };

  return (
    <button type="button" onClick={handleClick}>
      execute server action
    </button>
  );
}
