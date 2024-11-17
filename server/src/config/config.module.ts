import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configurations from './configurations';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      isGlobal: true,
    }),
  ],
})
export class AppConfigModule {}
