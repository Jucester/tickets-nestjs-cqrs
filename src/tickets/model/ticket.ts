import { BadRequestException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

export class Ticket extends AggregateRoot {
    constructor(
        private readonly _id: any,
    ) {
        super();
    }
}