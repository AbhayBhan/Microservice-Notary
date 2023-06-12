import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor() {
    this.appService = new AppService();
  }

  @Get('/')
  getServerStatus() {
    return this.appService.getServerStatus();
  }
}
