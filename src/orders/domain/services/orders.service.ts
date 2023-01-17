import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../../cqrs/commands/impl/create-order.command';
import { GetOrdersQuery } from '../../cqrs/queries/impl/get-orders.query';
import { CreateOrderDto } from '../../application/dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) { }

    async findAll() {
        const [result, error] = await this.queryBus.execute(new GetOrdersQuery());

        return result;
    }

    async create(order: CreateOrderDto) {
        return await this.commandBus.execute(new CreateOrderCommand(order));
    }
}
