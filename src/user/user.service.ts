import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }

    async create(createUserDto: CreateUserDto) {
        const user = new User();
        user.email = createUserDto.email;
        user.password = createUserDto.password;

        const index = (await this.findAll()).find((cur: any) => cur.email === user.email);

        if (index) {
            throw new BadRequestException();
        } else {
            this.userRepository.save(user);
            return {
                email: user.email,
                password: user.password,
            };
        }
    }

    async update(updateUserDto: UpdateUserDto, id: number): Promise<any> {
        const index = await this.findOne(id);

        if (!index) {
            throw new BadGatewayException();
        } else {
            this.userRepository.update(id, updateUserDto);
            return updateUserDto;
        }
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
