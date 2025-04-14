import { GraphQLRequest } from '@apollo/server';
import { InternalConfigService } from '@provfair/configuration/internalService';
import { JWTConfigService } from '@provfair/configuration/jwt';
import { GameBeResultCodes } from '@provfair/shared/enums';
import { AuthUser } from '@provfair/shared/interfaces/auth-user.interface';
import { Request, Response } from 'express';
import { NotAuthenticatedClientError } from '../graphql/errors/client/not-authenticated.error';
import JWTService from '../jwt/jwt.service';
import { AuthUserContext } from './auth-user.context';

export interface GraphQLContextDependencies {
  request: Request;
  response: Response;
  jwtService: JWTService;
  internalConfigService: InternalConfigService;
  jwtConfigService: JWTConfigService;
}

export class GraphQLContext implements AuthUserContext {
  public authUser?: AuthUser;

  public authError?: Error;

  private constructor(private readonly deps: GraphQLContextDependencies) {}

  public static async create(deps: GraphQLContextDependencies): Promise<GraphQLContext> {
    return new GraphQLContext(deps).reload();
  }

  public async reload(): Promise<this> {
    this.deps.response.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    this.deps.response.header('Content-Security-Policy', 'default-src https:');
    this.deps.response.header('X-Frame-Options', 'DENY');
    this.deps.response.header('X-Content-Type-Options', 'nosniff');
    this.deps.response.header('Referrer-Policy', 'no-referrer');
    this.deps.response.header('X-Xss-Protection', '1; mode=block');

    try {
      await this.verifyAuth();
    } catch (error) {
      // the error will be logged in AuthGuard when a protected resource is accessed
      this.authError = error as Error;
    }

    return this;
  }

  private getTokenFromHeader = () => {
    const req = this.deps.request;
    if (
      (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
      (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
      return req.headers.authorization.split(' ')[1];
    }

    return null;
  };

  public getRequestBody(): GraphQLRequest {
    return (this.deps.request.body as GraphQLRequest) || {};
  }

  private async verifyAuth(): Promise<void> {
    try {
      const token = this.getTokenFromHeader();
      if (!token) {
        throw new NotAuthenticatedClientError({
          context: this,
          code: GameBeResultCodes.NO_TOKEN,
        });
      }

      if (
        this.deps.request.headers['internal-key'] &&
        this.deps.request.headers['internal-key'] === this.deps.internalConfigService.internalKey
      ) {
        // verify admin user
        this.authUser = await this.deps.jwtService.verifyJwt(token, this.deps.jwtConfigService.adminSecret);

        return;
      }

      this.authUser = await this.deps.jwtService.verifyJwt(token);
    } catch (error) {
      if (error instanceof NotAuthenticatedClientError) {
        throw error;
      }

      throw new NotAuthenticatedClientError({
        context: this,
        message: error.message,
        code: GameBeResultCodes.INVALID_TOKEN,
      });
    }
  }
}
