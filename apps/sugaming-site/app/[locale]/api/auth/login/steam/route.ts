import { useLocale } from 'next-intl';
// import { loginSteam } from '@sugaming/sugaming-api-client/next';
import { loginSteam } from '@sugaming/sugaming-api-client/next';
import { redirect, RedirectType } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const openidNs = searchParams.get('openid.ns');
  const openidMode = searchParams.get('openid.mode');
  const openidOpEndpoint = searchParams.get('openid.op_endpoint');
  const openidClaimedId = searchParams.get('openid.claimed_id');
  const openidIdentity = searchParams.get('openid.identity');
  const openidReturnTo = searchParams.get('openid.return_to');
  const openidResponseNonce = searchParams.get('openid.response_nonce');
  const openidAssocHandle = searchParams.get('openid.assoc_handle');
  const openidSigned = searchParams.get('openid.signed');
  const openidSig = searchParams.get('openid.sig');

  const locale = useLocale();

  const response = await loginSteam(
    openidNs,
    openidMode,
    openidOpEndpoint,
    openidClaimedId,
    openidIdentity,
    openidReturnTo,
    openidResponseNonce,
    openidAssocHandle,
    openidSigned,
    openidSig,
  );
  if (response?.error) {
    return redirect(
      `/${locale}/login?error=${response.error}`,
      RedirectType.replace,
    );
  }
  return redirect(`/${locale}/login`, RedirectType.replace);
}
