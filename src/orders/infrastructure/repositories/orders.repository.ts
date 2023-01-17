import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, IOrder } from '../schemas/order.schema';
import { Document, Model, Types } from 'mongoose';
import { BaseRepository } from '../../../commons/infrastructure/repositories/base.repository';
import { Order as OrderModel } from '../../model/orders';
import { OrderCreatedEvent } from 'src/orders/cqrs/events/impl/order-created.event';

@Injectable()
export class OrdersRepository extends BaseRepository<IOrder> {
    constructor(@InjectModel(Order.name) private readonly _model: Model<IOrder>) {
        super(_model);
    }

    async create(document: any): Promise<any> {
        const [orderCreated] = await super.create(document);

        const order = new OrderModel(
            orderCreated._id,
            orderCreated.ticketId,
            orderCreated.userId,
            orderCreated.amount,
        );

        order.apply(
            new OrderCreatedEvent(
                orderCreated.ticketId,
                orderCreated.userId,
                orderCreated.amount,
            ));

        return order;
    }
}
