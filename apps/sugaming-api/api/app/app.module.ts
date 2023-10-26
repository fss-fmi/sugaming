import { Module } from '@nestjs/common';
import { HealthModule } from '../health/health.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [HealthModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

export default AppModule;
