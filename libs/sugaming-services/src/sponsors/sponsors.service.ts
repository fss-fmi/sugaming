import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SponsorsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.sponsor.findMany();
  }
}

export default SponsorsService;
