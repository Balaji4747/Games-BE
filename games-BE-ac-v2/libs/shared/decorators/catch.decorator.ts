import { asFunctionWithName } from '@provfair/shared/helpers/change-name';

type HandlerFunction = (error: Error, ctx: any) => void;

function handleError(ctx: any, errorType: any, handler: HandlerFunction, error: Error) {
  // Check if error is instance of given error type
  if (typeof handler === 'function' && (errorType == null || error instanceof errorType)) {
    // Run handler with error object and class context
    return handler.call(null, error, ctx);
  }
  // Throw error further
  // Next decorator in chain can catch it
  throw error;
}

export const Catch = (errorType: any, handler: HandlerFunction): any => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // Save a reference to the original method
    const originalMethod = descriptor.value;

    // Make an object to generate function with specific name
    const newDescriptorValue = function (...args: any[]) {
      try {
        const result = originalMethod.apply(this, args);

        // Check if method is asynchronous
        if (result && result instanceof Promise) {
          // Return promise
          return result.catch((error: any) => {
            return handleError(this, errorType, handler, error);
          });
        }

        // Return actual result
        return result;
      } catch (error) {
        return handleError(this, errorType, handler, error);
      }
    };

    // Rewrite original method with try/catch wrapper
    // eslint-disable-next-line no-param-reassign
    descriptor.value = asFunctionWithName(newDescriptorValue, propertyKey);

    return descriptor;
  };
};

export const CatchAll = (handler: HandlerFunction): any => Catch(null, handler);
