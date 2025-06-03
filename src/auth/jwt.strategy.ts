import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { tokenBlacklist } from './token-blacklist';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
      passReqToCallback: true, 
    });
  }

  async validate(req: Request, payload: any) {
    
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No Authorization header');
    }

    const token = authHeader.split(' ')[1]; // Bearer token

    if (tokenBlacklist.has(token)) {
      throw new UnauthorizedException('Token has been invalidated. Please login again.');
    }

    return payload;
  }
}
