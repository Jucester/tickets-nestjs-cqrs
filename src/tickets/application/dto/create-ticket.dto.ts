import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTicketDto {
    @IsString()
    @IsNotEmpty()
    readonly eventName: string;

    @IsNumber()
    @IsNotEmpty()
    readonly qty: number;
}
