import { Module } from '@nestjs/common';
import { HealthModule } from '../health/health.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [HealthModule, UsersService],
  controllers: [],
  providers: [],
})
export class AppModule {}

export default AppModule;
