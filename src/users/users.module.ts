import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/users.entity';
import { HashingModule } from 'src/hashing/hashing.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), HashingModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
