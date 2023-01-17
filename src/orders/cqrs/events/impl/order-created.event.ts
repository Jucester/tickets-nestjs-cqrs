export class OrderCreatedEvent {
    constructor(
        public readonly ticketId: string,
        public readonly userId: string,
        public readonly amount: number,
    ) { }
}