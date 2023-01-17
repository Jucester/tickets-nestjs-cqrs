import {
    Controller,
    Get,
    Body,
    Post,
    HttpCode,
} from '@nestjs/common';
import { OrdersService } from '../../domain/services/orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
    ) { }

    @Get('all')
    async getAll() {
        return await this.ordersService.findAll();
    }

    @Post('add')
    @HttpCode(201)
    async create(@Body() order: CreateOrderDto) {
        return await this.ordersService.create(order);
    }
}
