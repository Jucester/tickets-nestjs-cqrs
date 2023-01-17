import { ICommand } from '@nestjs/cqrs';
import { UpdateTicketDto } from '../../../application/dto/update-ticket.dto';

export class UpdateTicketCommand implements ICommand {
    constructor(
        public readonly ticket: any,
    ) { }
}
