import { ICommand } from "@nestjs/cqrs";
import { CreateOrderDto } from "../../../application/dto/create-order.dto";

export class CreateOrderCommand implements ICommand {
    constructor(public readonly order: CreateOrderDto) { }
}