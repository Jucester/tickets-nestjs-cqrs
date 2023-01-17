import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ITicket = HydratedDocument<Ticket>;

@Schema({
    timestamps: true,
})
export class Ticket {
    @Prop({ default: 1 })
    qty: number;

    @Prop({
        required: true,
    })
    eventName: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
