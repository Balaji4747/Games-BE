import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLContext } from '@provfair/modules/context/graphql.context';
import { NotAuthorizedClientError } from '@provfair/modules/graphql/errors/client/not-authorized.error';
import { INTERNAL_ONLY_KEY } from '../decorators/internalOnly.decorator';
import { AUTHENTICATED_KEY } from '../decorators/isAuthenticated.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public async canActivate(executionContext: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(executionContext);
    const ctx = gqlContext.getContext<GraphQLContext>();
    const { authError, authUser } = ctx;

    const handler = executionContext.getHandler();

    const isAuth: boolean | undefined = this.reflector.get(AUTHENTICATED_KEY, handler);

    if (authError && isAuth) {
      throw authError;
    }

    const isInternal = this.reflector.get(INTERNAL_ONLY_KEY, handler);

    if (isInternal && !authUser?.isAdmin) {
      throw new NotAuthorizedClientError({ context: this });
    }

    return true;
  }
}
