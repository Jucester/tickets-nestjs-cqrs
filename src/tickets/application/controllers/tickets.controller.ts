import {
    Controller,
    Get,
    Body,
    Post,
    HttpCode,
} from '@nestjs/common';
import { TicketsService } from '../../domain/services/tickets.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
    constructor(
        private readonly ticketsService: TicketsService,
    ) { }

    @Get('all')
    async getAll() {
        return await this.ticketsService.findAll();
    }

    @Post('add')
    @HttpCode(201)
    async create(@Body() ticket: CreateTicketDto) {
        return await this.ticketsService.create(ticket);
    }
}
