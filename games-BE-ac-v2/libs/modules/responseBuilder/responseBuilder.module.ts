import { Global, Module } from '@nestjs/common';
import { ResponseBuilderService } from './responseBuilder.service';

@Global()
@Module({
  providers: [ResponseBuilderService],
  exports: [ResponseBuilderService],
})
export class ResponseBuilderModule {}
