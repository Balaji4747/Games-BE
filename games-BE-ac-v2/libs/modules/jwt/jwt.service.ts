import { Injectable } from '@nestjs/common';
import { JWTConfigService } from '@provfair/configuration/jwt';
import { sign, TokenExpiredError, verify } from 'jsonwebtoken';

@Injectable()
export default class JWTService {
  constructor(private readonly jwtConfigService: JWTConfigService) {}

  public generateToken(data: any, expiresIn: string | number = this.jwtConfigService.validity) {
    return sign(data, this.jwtConfigService.secret, { expiresIn });
  }

  public verifyJwt(token: string, secret?: string) {
    return new Promise<any>((resolve, reject) => {
      verify(token, secret ?? this.jwtConfigService.secret, async function (err, decoded) {
        if (err) {
          if (err instanceof TokenExpiredError) {
            err.message = 'Token expired';
          }

          return reject(err);
        }

        resolve(decoded);
      });
    });
  }
}
