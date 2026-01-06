import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './interface/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(dto: CreateUserDto){
    const hashedPassword = await bcrypt.hash(dto.password,10);

    const newUser = {
      id: Date.now(),
      firstname: dto.firstname,
      lastname: dto.lastname,
      email: dto.email,
      password: hashedPassword,
    }

    this.users.push(newUser);

    const { password, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string) {
    return this.users.find(user => user.email === email)
  }
}
