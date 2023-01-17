import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './application/controllers/orders.controller';
import { CreateOrderHandler } from './cqrs/commands/handlers/create-order.handler';
import { GetOrdersHandler } from './cqrs/queries/handlers/get-orders.handler';
import { OrderCreatedEvent } from './cqrs/events/impl/order-created.event';
import { OrdersService } from './domain/services/orders.service';
import { OrdersRepository } from './infrastructure/repositories/orders.repository';
import { Order, OrderSchema } from './infrastructure/schemas/order.schema';
import { OrderCreatedHandler } from './cqrs/events/handlers/order-created.handler';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
        CqrsModule,
    ],
    providers: [
        OrdersService,
        OrdersRepository,
        GetOrdersHandler,
        CreateOrderHandler,
        OrderCreatedEvent,
        OrderCreatedHandler,
    ],
    controllers: [OrdersController]
})
export class OrdersModule { }
