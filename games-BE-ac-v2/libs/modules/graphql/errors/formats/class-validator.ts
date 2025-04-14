import { ValidationError } from 'class-validator';

/**
 * Formats a class validator error before show it to a client.
 */
export function formatClassValidatorError(error: ValidationError): {
  property: string;
  constraints?: Record<string, any>;
  children?: Record<string, any>[];
} {
  return {
    property: error.property,
    constraints: error.constraints,
    children:
      error.children && error.children.length > 0
        ? error.children.map((child) => formatClassValidatorError(child))
        : undefined,
  };
}
