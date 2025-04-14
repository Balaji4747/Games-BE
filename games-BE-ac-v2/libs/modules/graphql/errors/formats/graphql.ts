import { GraphQLError, GraphQLFormattedError } from 'graphql';

import { NotValidClientError } from '../client/not-valid.error';
import { BaseRichError } from '../rich-error.base';

/**
 * @returns It returns partial because apollo server can delete rich error fields for errors during context creation.
 */
export function graphQLErrorToRichError(graphQLError: GraphQLError): Partial<BaseRichError> {
  const extensions: { code?: string; exception?: { code?: string } } | undefined = graphQLError.extensions;

  if (extensions?.code === 'GRAPHQL_VALIDATION_FAILED') {
    return new NotValidClientError({
      context: graphQLErrorToRichError,
      message: graphQLError.message,
    });
  }

  return (
    [
      graphQLError,
      graphQLError.originalError,
      (graphQLError.originalError as { originalError?: Record<string, any> })?.originalError,
    ].find((error) => error instanceof BaseRichError) ||
    BaseRichError.toRichError(graphQLErrorToRichError, graphQLError)
  );
}

/**
 * Formats a GraphQL error before show it to a client.
 */
export function formatGraphQLError(graphQLError: GraphQLError, showInternals: boolean): GraphQLFormattedError {
  const { path, locations, message } = graphQLError;
  const richError = graphQLErrorToRichError(graphQLError);

  const extensions: Record<string, unknown> = {
    name: richError.name,
    httpCode: richError.httpCode,
    code: richError.code,
    public: richError.public,
  };

  if (showInternals) {
    extensions.context = richError.context;
    extensions.logLevel = richError.logLevel;
    extensions.doNotCaptureStack = richError.doNotCaptureStack;
    extensions.stack = richError.stack?.split('\n');
    extensions.internal = richError.internal;
    extensions.prevError = richError.prevError;
    extensions.prevErrorMessage = richError.prevErrorMessage;
  }

  return {
    message: message ?? richError.message!,
    path,
    locations,
    extensions,
  };
}
