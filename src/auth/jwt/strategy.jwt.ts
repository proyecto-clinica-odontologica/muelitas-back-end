import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtoPayload } from '../interfaces/jwt.payload.interface';

@Injectable()
export class StrategyJwt extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly dbUser: Repository<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtoPayload): Promise<User> {
    const { correo } = payload;

    const user = await this.dbUser.findOneBy({ correo });

    if (!user) {
      throw new UnauthorizedException('Token no valido');
    }

    return user;
  }
}
