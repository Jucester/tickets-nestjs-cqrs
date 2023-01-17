import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsController } from './application/controllers/tickets.controller';
import { CreateTicketHandler } from './cqrs/commands/handlers/create-ticket.handler';
import { UpdateTicketHandler } from './cqrs/commands/handlers/update-ticket.handler';
import { GetTicketsHandler } from './cqrs/queries/handlers/get-tickets.handler';
import { TicketsSagas } from './cqrs/sagas/ticket.sagas';
import { TicketsService } from './domain/services/tickets.service';
import { TicketsRepository } from './infrastructure/repositories/tickets.repository';
import { Ticket, TicketSchema } from './infrastructure/schemas/ticket.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
        CqrsModule,
    ],
    providers: [
        TicketsService,
        TicketsRepository,
        GetTicketsHandler,
        CreateTicketHandler,
        UpdateTicketHandler,
        TicketsSagas,
    ],
    controllers: [TicketsController]
})
export class TicketsModule { }
