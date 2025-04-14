import { Global, Module } from '@nestjs/common';
import { JWTConfigModule } from '@provfair/configuration/jwt';
import JWTService from './jwt.service';

@Global()
@Module({
  imports: [JWTConfigModule],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {}
