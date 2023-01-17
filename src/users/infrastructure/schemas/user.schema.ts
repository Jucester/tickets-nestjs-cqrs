import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { hashSync, genSaltSync } from 'bcryptjs';

export type IUser = HydratedDocument<User>;

@Schema({
    timestamps: true,
})
export class User {
    @Prop({
        required: true,
        lowercase: true,
        trim: true,
    })
    firstName: string;

    @Prop({
        lowercase: true,
        trim: true,
    })
    lastName: string;

    @Prop({
        required: true,
        lowercase: true,
        trim: true,
    })
    email: string;

    @Prop({
        required: true,
        set(plainText: string) {
            const salt = genSaltSync();
            return hashSync(plainText, salt);
        },
    })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullName')
    .set(function (fullName: string) {
        const [firstName, lastName] = fullName.split(' ');
        this.set({ firstName, lastName });
    })
    .get(function () {
        return this.lastName
            ? this.firstName.concat(' ', this.lastName)
            : this.firstName;
    });
