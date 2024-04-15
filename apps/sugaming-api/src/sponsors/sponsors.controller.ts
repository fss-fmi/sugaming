import { Controller, Get, HttpCode, HttpStatus, Version } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SponsorsService } from '@sugaming/sugaming-services/sponsors/sponsors.service';
import { SponsorDto } from '@sugaming/sugaming-services/sponsors/dto/sponsor.dto';

@Controller('sponsors')
@ApiTags('Sponsors API')
export class SponsorsController {
  constructor(private readonly sponsorsService: SponsorsService) {}

  @Get()
  @Version(['1'])
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all sponsors',
    description: 'Endpoint for getting all sponsors.',
  })
  @ApiOkResponse({
    description: 'Sponsors retrieved successfully.',
    type: [SponsorDto],
  })
  async getV1() {
    return this.sponsorsService.getAll();
  }
}
