import { BadRequestException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

export class Order extends AggregateRoot {
    constructor(
        private readonly _id: any,
        private readonly ticketId: string,
        private readonly userId: string,
        private readonly amount: number,
    ) {
        super();
    }

    getId(): string {
        return this._id;
    }

    getAmount(): number {
        return this.amount;
    }
}