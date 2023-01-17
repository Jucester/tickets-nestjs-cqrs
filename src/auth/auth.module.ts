import { Module } from '@nestjs/common';
import { AuthService } from './domain/services/auth.service';

@Module({
  providers: [AuthService]
})
export class AuthModule { }
