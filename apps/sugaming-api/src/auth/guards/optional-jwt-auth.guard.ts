import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard(['jwt', 'anonymous']) {}

export default OptionalJwtAuthGuard;
