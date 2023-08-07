import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  message = 'Hello API';

  getData(): { message: string } {
    return { message: this.message };
  }
}

export default AppService;
