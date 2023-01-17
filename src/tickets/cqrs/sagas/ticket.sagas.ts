import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { OrderCreatedEvent } from 'src/orders/cqrs/events/impl/order-created.event';
import { UpdateTicketCommand } from '../commands/impl/update-ticket.command';

@Injectable()
export class TicketsSagas {
    @Saga()
    dragonKilled = (events$: Observable<any>): Observable<ICommand> => {
        return events$
            .pipe(
                ofType(OrderCreatedEvent),
                delay(1000),
                map(event => {
                    console.log('Inside Tickets Saga to run logic');
                    return new UpdateTicketCommand(event);
                }),
            );
    }
}