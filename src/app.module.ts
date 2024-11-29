import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { defaultEnvConfig } from './common/configurations/env/env.config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ShareModule } from './common/services/share.module';

@Module({
  imports: [
    ConfigModule.forRoot(defaultEnvConfig),
    UsersModule,
    RolesModule,
    ShareModule,
  ],
  controllers: [],
})
export class AppModule {}
