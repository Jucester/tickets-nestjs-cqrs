import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UsersRepository } from 'src/users/infrastructure/repositories/users.repository';
import { GetUsersQuery } from '../impl/get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly usersRepository: UsersRepository) { }

  async execute(query: GetUsersQuery) {
    return await this.usersRepository.findAll(query);
  }
}