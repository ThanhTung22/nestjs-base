import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getApp(): string {
    return 'Server is running';
  }
}
