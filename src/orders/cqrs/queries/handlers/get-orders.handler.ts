import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OrdersRepository } from '../../../infrastructure/repositories/orders.repository';
import { GetOrdersQuery } from '../impl/get-orders.query';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(private readonly ordersRepository: OrdersRepository) { }

  async execute(query: GetOrdersQuery) {
    return await this.ordersRepository.findAll(query);
  }
}