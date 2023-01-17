import { Module } from '@nestjs/common';
import { UsersService } from './domain/services/users.service';
import { UsersController } from './application/controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUsersHandler } from './cqrs/queries/handlers/get-users.handler';
import { CreateUserHandler } from './cqrs/commands/handlers/create-user.handler';
import { UsersRepository } from './infrastructure/repositories/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CqrsModule,
  ],
  providers: [
    UsersService,
    UsersRepository,
    GetUsersHandler,
    CreateUserHandler,
  ],
  controllers: [UsersController]
})
export class UsersModule { }
