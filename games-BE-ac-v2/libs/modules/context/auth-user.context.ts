import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';

/**
 * Authenticated user context.
 * This interface need to resolve cyclic dependency between GraphQLContext and services.
 */
export interface AuthUserContext {
  authUser?: AuthUser;
  authError?: Error;
}
