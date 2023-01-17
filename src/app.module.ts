import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { OrdersModule } from './orders/orders.module';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CommonsModule } from './commons/commons.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://jucester:y9VdsW13Yq9d8hUH@cluster0.wusjj.mongodb.net/vgstation?authSource=admin&replicaSet=atlas-24kzg2-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
    ),
    UsersModule,
    TicketsModule,
    OrdersModule,
    EventsModule,
    AuthModule,
    CommonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
