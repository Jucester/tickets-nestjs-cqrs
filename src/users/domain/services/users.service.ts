import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../cqrs/commands/impl/create-user.command';
import { GetUsersQuery } from '../../cqrs/queries/impl/get-users.query';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { BaseService } from '../../../commons/domain/services/base.service';

@Injectable()
// export class UsersService extends BaseService<IUser, UsersRepository> {
export class UsersService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) { }

    async findAll() {
        const [result, error] = await this.queryBus.execute(new GetUsersQuery());

        return result;
    }

    async create(user: CreateUserDto) {
        return await this.commandBus.execute(new CreateUserCommand(user));
    }
}
