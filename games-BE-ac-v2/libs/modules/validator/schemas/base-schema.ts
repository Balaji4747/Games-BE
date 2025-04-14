import { JSONSchema6 } from 'json-schema';

export type SchemaListType = Record<string, BaseSchema>;

export abstract class BaseSchema {
  public readonly key: string;

  protected schema: JSONSchema6;

  public getSchema(): JSONSchema6 {
    return this.schema;
  }
}
