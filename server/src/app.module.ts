import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PhishingModule } from './modules/phishing/phishing.module';
import { AppConfigModule } from "./config/config.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PhishingModule,
    AppConfigModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('mongodb.url'),
      }),
    }),
  ],
  providers: [JwtAuthGuard],
})
export class AppModule { }
