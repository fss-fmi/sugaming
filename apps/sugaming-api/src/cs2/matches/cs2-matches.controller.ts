import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cs2MatchesService } from '@sugaming/sugaming-services/cs2/matches/cs2-matches.service';

@Controller('cs2/matches')
@ApiTags('CS2 Matches API')
export class Cs2MatchesController {
  constructor(private readonly cs2MatchesService: Cs2MatchesService) {}
}
