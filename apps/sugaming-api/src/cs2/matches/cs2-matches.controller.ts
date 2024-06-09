import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Version,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Cs2MatchesService } from '@sugaming/sugaming-services/cs2/matches/cs2-matches.service';
import { Cs2MatchDto } from '@sugaming/sugaming-services/cs2/matches/dto/cs2-match.dto';
import { Cs2MatchGetParamsDto } from '@sugaming/sugaming-services/cs2/matches/dto/cs2-match-get-params.dto';

@Controller('cs2/matches')
@ApiTags('CS2 Matches API')
export class Cs2MatchesController {
  constructor(private readonly cs2MatchesService: Cs2MatchesService) {}

  @Get(':matchId')
  @Version(['1'])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get a specific CS2 match',
    description: 'Endpoint for getting a specific CS2 match by id.',
  })
  @ApiOkResponse({
    description: 'CS2 match retrieved successfully.',
    type: Cs2MatchDto,
  })
  @ApiNotFoundResponse({ description: 'The team specified does not exist.' })
  async getTeamV1(@Param() params: Cs2MatchGetParamsDto): Promise<Cs2MatchDto> {
    return this.cs2MatchesService.getById(params.matchId);
  }
}
