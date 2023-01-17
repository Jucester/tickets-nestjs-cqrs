import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, IUser } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../commons/infrastructure/repositories/base.repository';

@Injectable()
export class UsersRepository extends BaseRepository<IUser> {
    constructor(@InjectModel(User.name) private readonly _model: Model<IUser>) {
        super(_model);
    }
}
