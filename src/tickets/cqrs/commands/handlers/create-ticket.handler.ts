import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TicketsRepository } from "../../../infrastructure/repositories/tickets.repository";
import { CreateTicketCommand } from "../impl/create-ticket.command"

@CommandHandler(CreateTicketCommand)
export class CreateTicketHandler implements ICommandHandler<CreateTicketCommand> {
    constructor(private readonly ticketsRepository: TicketsRepository) { }

    async execute(command: CreateTicketCommand) {
        console.log('Executing Ticket Creation');
        await this.ticketsRepository.create(command.ticket);
    }
}