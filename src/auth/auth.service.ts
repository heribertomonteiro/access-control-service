import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async validateUser(email: string, password: string) {
        const user =  await this.usersService.findByEmail(email);
        console.log('USER FOUND:', user?.email);

        if(!user){
            throw new UnauthorizedException('Email inválido');
        }

        const isPasswordValide =  await bcrypt.compare(password, user.password);
        console.log('IS PASSWORD VALIDE:', isPasswordValide);

        if(!isPasswordValide){
            throw new UnauthorizedException('Senha inválida');
        }

        const { password: _, ...safeUser } = user;
        return safeUser;
    }
}
