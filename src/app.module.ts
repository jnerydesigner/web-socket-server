import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './data/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AppGateway } from './app/app.gateway';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService, AppGateway],
})
export class AppModule {}
