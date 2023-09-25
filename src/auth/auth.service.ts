import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly dbUser: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { contra, ...restoPropiedades } = createUserDto;
    try {
      const user = this.dbUser.create({
        contra: bcrypt.hashSync(contra, 10),
        ...restoPropiedades,
      });

      await this.dbUser.save(user);
      delete user.contra;
      return user;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any): never {
    this.logger.error(error);
    if (error.errno === 1062) {
      throw new BadRequestException(error);
    }
    console.log(error);
    throw new InternalServerErrorException('revisa los logs del servidor');
  }
}
