import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerStatus() {
    return 'SubRef Microservice Working Fine!';
  }
}
