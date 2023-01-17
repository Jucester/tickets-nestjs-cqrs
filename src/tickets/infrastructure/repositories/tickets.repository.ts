import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../commons/infrastructure/repositories/base.repository';
import { ITicket, Ticket } from '../schemas/ticket.schema';

@Injectable()
export class TicketsRepository extends BaseRepository<ITicket> {
    constructor(@InjectModel(Ticket.name) private readonly _model: Model<ITicket>) {
        super(_model);
    }
}
