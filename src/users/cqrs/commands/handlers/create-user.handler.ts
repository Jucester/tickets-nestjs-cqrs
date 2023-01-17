import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UsersRepository } from "../../../infrastructure/repositories/users.repository";
import { CreateUserCommand } from "../impl/create-user.command"

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(private readonly usersRepository: UsersRepository) { }

    async execute(command: CreateUserCommand) {
        console.log('Executing order sixtysix')
        await this.usersRepository.create(command.user);
    }
}