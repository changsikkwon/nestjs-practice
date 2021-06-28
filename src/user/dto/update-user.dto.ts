import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNumber()
    id: number;

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;
}
