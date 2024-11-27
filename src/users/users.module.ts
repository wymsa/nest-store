import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HashingModule } from 'src/hashing/hashing.module';

@Module({
  imports: [HashingModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
