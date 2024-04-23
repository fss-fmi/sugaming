import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Version,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GameDevEventDto } from '@sugaming/sugaming-services/game-dev/events/dto/game-dev-event.dto';
import { GameDevEventGetParamsDto } from '@sugaming/sugaming-services/game-dev/events/dto/game-dev-event-get-params.dto';
import { GameDevEventsService } from '@sugaming/sugaming-services/game-dev/events/game-dev-events.service';
import { UserDto } from '@sugaming/sugaming-services/users/dto/user.dto';
import { UserAuth } from '../../users/user-auth.decorator';

@Controller('game-dev/events')
@ApiTags('Game Dev Events API')
export class GameDevEventsController {
  constructor(private readonly gameDevEventsService: GameDevEventsService) {}

  @Get(':eventName')
  @Version(['1'])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get a Game Dev event by name.',
    description: "Endpoint for getting a Game Dev event by it's url name.",
  })
  @ApiOkResponse({
    description: 'Game Dev event information.',
    type: GameDevEventDto,
  })
  async getGameDevEventV1(
    @Param() params: GameDevEventGetParamsDto,
  ): Promise<GameDevEventDto> {
    return this.gameDevEventsService.getByName(params.eventName);
  }

  @Post(':eventName/join')
  @Version(['1'])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Join a Game Dev event.',
    description: 'Endpoint for users to join a Game Dev event.',
  })
  @ApiOkResponse({
    description: 'Success message.',
  })
  async joinGameDevEventV1(
    @Param() params: GameDevEventGetParamsDto,
    @UserAuth() user: UserDto,
  ): Promise<void> {
    await this.gameDevEventsService.joinEvent(params.eventName, user.id);
  }
}
