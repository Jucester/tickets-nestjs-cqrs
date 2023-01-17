import {
    CommandHandler,
    ICommandHandler,
    EventPublisher,
    EventBus,
} from '@nestjs/cqrs';
import { OrdersRepository } from '../../../infrastructure/repositories/orders.repository';
import { CreateOrderCommand } from '../impl/create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly publisher: EventPublisher,
        private readonly eventBus: EventBus,
    ) { }

    async execute(command: CreateOrderCommand) {
        console.log('Executing Order Creation');

        const order = this.publisher.mergeObjectContext(
            await this.ordersRepository.create(command.order),
        );

        order.commit();
    }
}
