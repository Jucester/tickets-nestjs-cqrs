import { ICommand } from "@nestjs/cqrs";
import { CreateUserDto } from "../../../application/dto/create-user.dto";

export class CreateUserCommand implements ICommand {
    constructor(public readonly user: CreateUserDto) { }
}