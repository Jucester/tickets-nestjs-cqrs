import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TicketsRepository } from '../../../infrastructure/repositories/tickets.repository';
import { GetTicketsQuery } from '../impl/get-tickets.query';

@QueryHandler(GetTicketsQuery)
export class GetTicketsHandler implements IQueryHandler<GetTicketsQuery> {
  constructor(private readonly ticketsRepository: TicketsRepository) { }

  async execute(query: GetTicketsQuery) {
    return await this.ticketsRepository.findAll(query);
  }
}