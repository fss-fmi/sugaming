import { Strategy } from 'passport-anonymous';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnonymousStrategy extends PassportStrategy(Strategy) {}

export default AnonymousStrategy;
