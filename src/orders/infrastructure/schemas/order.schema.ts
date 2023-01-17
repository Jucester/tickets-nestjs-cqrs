import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type IOrder = HydratedDocument<Order>;

@Schema({
    timestamps: true,
})
export class Order {
    @Prop({ default: 1 })
    amount: number;

    @Prop({
        required: true,
    })
    ticketId: string;

    @Prop({
        required: true,
    })
    userId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);