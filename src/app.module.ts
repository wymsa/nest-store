import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { defaultEnvConfig } from './common/configurations/env/env.config';

@Module({
  imports: [ConfigModule.forRoot(defaultEnvConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
