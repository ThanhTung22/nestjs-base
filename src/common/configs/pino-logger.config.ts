import { Params } from 'nestjs-pino';
import { Environment } from '../constants/common.constant';

export const pinoLoggerConfig: Params = {
  pinoHttp: {
    autoLogging: false,
    transport:
      process.env.NODE_ENV !== Environment.PRODUCTION
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard',
            },
          }
        : undefined,
  },
};
