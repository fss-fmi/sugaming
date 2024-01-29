import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';

@Controller()
export class UsersController {
  @MessagePattern('users:discord_account_link')
  userDiscordAccountLinked(
    @Payload() userDiscordId: number,
    @Ctx() context: RedisContext,
  ) {
    console.log(`Data: ${userDiscordId}`);
  }
}
