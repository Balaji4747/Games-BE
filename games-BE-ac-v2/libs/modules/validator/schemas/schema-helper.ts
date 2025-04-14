import { JSONSchema6, JSONSchema6Definition } from 'json-schema';

export const StringWithEnum: (enumValue: Record<string, any>) => JSONSchema6 = (
  enumValue: Record<string, string>,
): JSONSchema6 => ({
  type: 'string',
  enum: Object.values(enumValue),
});

export const BooleanJsonType: JSONSchema6Definition = {
  type: 'boolean',
};

export const BooleanJsonTypeWithDefaultFalse: JSONSchema6Definition = {
  ...BooleanJsonType,
  default: false,
};

export const BooleanJsonTypeWithDefaultTrue: JSONSchema6Definition = {
  ...BooleanJsonType,
  default: true,
};

export const ArrayOfEnumStrings: (
  enumValue: Record<string, any>,
  itemParams?: JSONSchema6,
  metadata?: Record<string, any>,
) => JSONSchema6 = (enumValue, itemParams = {}, metadata = {}) => ({
  type: 'array',
  items: {
    ...StringWithEnum(enumValue),
    ...itemParams,
    metadata: Object.keys(metadata)?.length ? { ...metadata } : undefined,
  },
});
