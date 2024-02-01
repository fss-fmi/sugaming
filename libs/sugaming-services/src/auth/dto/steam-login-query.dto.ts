import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SteamLoginQueryDto {
  @ApiProperty({
    name: 'openid.ns',
    description: 'The namespace identifier for OpenID',
    example: 'http://specs.openid.net/auth/2.0',
  })
  @Expose({ name: 'openid.ns' })
  openidNs?: string;

  @ApiProperty({
    name: 'openid.mode',
    description: 'The mode of OpenID operation',
    example: 'checkid_setup',
  })
  @Expose({ name: 'openid.mode' })
  openidMode?: string;

  @ApiProperty({
    name: 'openid.op_endpoint',
    description: 'The endpoint URL of the OpenID provider',
    example: 'http://www.steamcommunity.com/openid',
  })
  @Expose({ name: 'openid.op_endpoint' })
  openidOpEndpoint?: string;

  @ApiProperty({
    name: 'openid.claimed_id',
    description: 'The claimed identifier for the OpenID',
    example: 'http://steamcommunity.com/openid/id/123456789',
  })
  @Expose({ name: 'openid.claimed_id' })
  openidClaimedId?: string;

  @ApiProperty({
    name: 'openid.identity',
    description: 'The identity of the OpenID',
    example: 'http://steamcommunity.com/openid/id/123456789',
  })
  @Expose({ name: 'openid.identity' })
  openidIdentity?: string;

  @ApiProperty({
    name: 'openid.return_to',
    description: 'The URL to return to after OpenID verification',
    example: 'http://www.example.com/auth/steam/return',
  })
  @Expose({ name: 'openid.return_to' })
  openidReturnTo?: string;

  @ApiProperty({
    name: 'openid.response_nonce',
    description: 'The nonce value for the OpenID response',
    example: '2022-03-01T12:34:56Zzxcvbnm',
  })
  @Expose({ name: 'openid.response_nonce' })
  openidResponseNonce?: string;

  @ApiProperty({
    name: 'openid.assoc_handle',
    description: 'The association handle for the OpenID',
    example: '{HMAC-SHA1}{61c46fd3}{Zk6vWA==}',
  })
  @Expose({ name: 'openid.assoc_handle' })
  openidAssocHandle?: string;

  @ApiProperty({
    name: 'openid.signed',
    description: 'The signed fields for the OpenID',
    example:
      'signed,op_endpoint,claimed_id,identity,return_to,response_nonce,assoc_handle',
  })
  @Expose({ name: 'openid.signed' })
  openidSigned?: string;

  @ApiProperty({
    name: 'openid.sig',
    description: 'The signature for the OpenID',
    example: 'RJ/.../6Q==',
  })
  @Expose({ name: 'openid.sig' })
  openidSig?: string;
}

export default SteamLoginQueryDto;
