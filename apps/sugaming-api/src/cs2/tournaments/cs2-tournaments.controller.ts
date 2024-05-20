import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Version,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Cs2TournamentsService } from '@sugaming/sugaming-services/cs2/tournaments/cs2-tournaments.service';
import { Cs2TournamentDto } from '@sugaming/sugaming-services/cs2/tournaments/dto/cs2-tournament.dto';
import { Cs2TournamentGetParamsDto } from '@sugaming/sugaming-services/cs2/tournaments/dto/cs2-tournament-get-params.dto';

@Controller('cs2/tournaments')
@ApiTags('CS2 Tournaments API')
export class Cs2TournamentsController {
  constructor(private readonly cs2TournamentsService: Cs2TournamentsService) {}

  @Get(':tournamentName')
  @Version(['1'])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get a CS2 tournament by name.',
    description: 'Endpoint for getting a CS2 tournament by name.',
  })
  @ApiOkResponse({
    description: 'CS2 Tournament information.',
    type: Cs2TournamentDto,
  })
  async getCs2TournamentV1(
    @Param() params: Cs2TournamentGetParamsDto,
  ): Promise<Cs2TournamentDto> {
    return this.cs2TournamentsService.getByName(params.tournamentName);
  }
}
