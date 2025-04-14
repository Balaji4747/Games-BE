import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthUserContext } from '@provfair/modules/context/auth-user.context';
import { NotAuthenticatedClientError } from '@provfair/modules/graphql/errors/client/not-authenticated.error';
import { AuthUser } from '../interfaces/auth-user.interface';
import { AUTHENTICATED_KEY } from './isAuthenticated.decorator';

/**
 * Parameter decorator to get authenticated user data into GraphQL resolver parameter.
 * @returns {AuthUser}
 * @throws {AuthenticationError}
 */
export const CurrentUser = createParamDecorator((data: unknown, executionContext: ExecutionContext): AuthUser => {
  const { authUser } = GqlExecutionContext.create(executionContext).getContext<AuthUserContext>();

  const isAuth: boolean | undefined = Reflect.getMetadata(AUTHENTICATED_KEY, executionContext.getHandler());

  if (isAuth && !authUser) {
    throw new NotAuthenticatedClientError({ context: CurrentUser });
  }

  return authUser;
});
