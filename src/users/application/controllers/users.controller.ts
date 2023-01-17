import {
    Controller,
    Get,
    Body,
    Post,
    HttpCode,
} from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { CreateUserCommand } from '../../cqrs/commands/impl/create-user.command';
import { GetUsersQuery } from '../../cqrs/queries/impl/get-users.query';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get('all')
    async getAll() {
        return await this.usersService.findAll();
    }

    @Post('add')
    @HttpCode(201)
    async create(@Body() user: CreateUserDto) {
        return await this.usersService.create(user);
    }
}
