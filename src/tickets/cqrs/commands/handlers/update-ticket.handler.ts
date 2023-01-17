import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TicketsRepository } from '../../../infrastructure/repositories/tickets.repository';
import { UpdateTicketCommand } from '../impl/update-ticket.command';

@CommandHandler(UpdateTicketCommand)
export class UpdateTicketHandler
    implements ICommandHandler<UpdateTicketCommand>
{
    constructor(private readonly ticketsRepository: TicketsRepository) { }

    async execute(command: any) {
        console.log('Executing Ticket Update', command.ticket);
        const [ticket] = await this.ticketsRepository.findOneById(command.ticket.ticketId);

        console.log('Ticket', ticket);

        await this.ticketsRepository.updateOneById(command.ticket.ticketId, { qty: ticket.qty - command.ticket.amount });
    }
}
