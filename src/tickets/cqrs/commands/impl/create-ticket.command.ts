import { ICommand } from "@nestjs/cqrs";
import { CreateTicketDto } from "../../../application/dto/create-ticket.dto";

export class CreateTicketCommand implements ICommand {
    constructor(public readonly ticket: CreateTicketDto) { }
}