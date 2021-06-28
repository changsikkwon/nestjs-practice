import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param() id: number): Promise<User> {
        return this.userService.findOne(id);
    }

    @Post()
    async create(@Body() user: CreateUserDto): Promise<any> {
        return this.userService.create(user);
    }

    @Put(':id')
    async update(@Body() updateUserDto: UpdateUserDto, @Param() id: number) {
        return this.userService.update(updateUserDto, id);
    }

    @Delete(':id')
    async delete(@Param() id: number) {
        return this.userService.remove(id);
    }
}
