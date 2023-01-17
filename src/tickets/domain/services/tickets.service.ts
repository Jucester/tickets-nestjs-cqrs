import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTicketsQuery } from '../../cqrs/queries/impl/get-tickets.query';
import { CreateTicketCommand } from '../../cqrs/commands/impl/create-ticket.command';
import { CreateTicketDto } from '../../application/dto/create-ticket.dto';

@Injectable()
export class TicketsService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) { }

    async findAll() {
        const [result, error] = await this.queryBus.execute(new GetTicketsQuery());

        return result;
    }

    async create(ticket: CreateTicketDto) {
        return await this.commandBus.execute(new CreateTicketCommand(ticket));
    }
}
