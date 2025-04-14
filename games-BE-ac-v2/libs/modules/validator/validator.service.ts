import { Injectable } from '@nestjs/common';
import { MonitoringService } from '@provfair/monitoring';
import Ajv, { ValidateFunction } from 'ajv';
import { SchemaListType } from './schemas/base-schema';

@Injectable()
export class ValidatorService {
  private readonly ajv: Ajv;
  private readonly validatorCache: Map<string, ValidateFunction> = new Map();

  constructor(private readonly monitor: MonitoringService) {
    this.ajv = new Ajv({ allErrors: true, strict: false });
  }

  // Precompile and cache all schemas during application startup
  public precompileSchemas(schemaList: SchemaListType) {
    this.monitor.info('Precompiling schemas...');

    for (const key in schemaList) {
      const schema = schemaList[key].getSchema();
      const validator = this.ajv.compile(schema);
      this.validatorCache.set(key, validator);
    }

    this.monitor.info('Schemas precompiled and cached successfully.');
  }

  public validate({ key, data }: { key: string; data: unknown }) {
    const validator = this.validatorCache.get(key);

    if (!validator) {
      const message = `No validator found for key: ${key}`;

      this.monitor.error(message);

      throw new Error(message);
    }

    const isValid = validator(data);

    if (!isValid) {
      const message = this.ajv.errorsText(validator.errors);

      this.monitor.error(`Validation error for key: ${key}: ${message}`);

      throw new Error(message);
    }
  }
}
