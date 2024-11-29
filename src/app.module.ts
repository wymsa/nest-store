import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { defaultEnvConfig } from './common/configurations/env/env.config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PrismaService } from './common/services/prisma.service';
import { HashingService } from './common/services/hashing.service';

@Module({
  imports: [ConfigModule.forRoot(defaultEnvConfig), UsersModule, RolesModule],
  controllers: [],
  providers: [PrismaService, HashingService],
})
export class AppModule {}
