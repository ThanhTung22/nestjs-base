import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { I18nExceptionFilter } from './common/exceptions/i18n.exception';
import { LoggerModule } from 'nestjs-pino';
import { I18nModule } from 'nestjs-i18n';
import { TaskModule } from './modules/task/task.module';
import { I18nConfiguration } from './common/configs/i18n.config';
import { pinoLoggerConfiguration } from './common/configs/pino-logger.config';
import { databaseConfiguration } from './common/configs/database.config';

@Module({
  imports: [
    I18nModule.forRoot(I18nConfiguration),
    TypeOrmModule.forRoot(databaseConfiguration),
    LoggerModule.forRoot(pinoLoggerConfiguration),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: I18nExceptionFilter },
  ],
})
export class AppModule {}
