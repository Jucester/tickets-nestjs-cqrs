import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    readonly ticketId: string;

    @IsString()
    readonly userId: string;

    @IsNumber()
    @IsNotEmpty()
    readonly amount: string;
}
