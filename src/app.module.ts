import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { I18nExceptionFilter } from './common/exceptions/i18n.exception';
import { LoggerModule } from 'nestjs-pino';
import { I18nModule } from 'nestjs-i18n';
import { TaskModule } from './modules/task/task.module';
import { i18nConfig } from './common/configs/i18n.config';
import { pinoLoggerConfig } from './common/configs/pino-logger.config';
import { databaseConfig } from './common/configs/database.config';

@Module({
  imports: [
    I18nModule.forRoot(i18nConfig),
    TypeOrmModule.forRoot(databaseConfig),
    LoggerModule.forRoot(pinoLoggerConfig),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_FILTER, useClass: I18nExceptionFilter }],
})
export class AppModule {}
