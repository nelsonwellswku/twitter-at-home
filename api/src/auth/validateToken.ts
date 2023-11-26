import { verify } from 'azure-ad-verify-token';
import { JwtPayload } from 'jsonwebtoken';
import { createResolver } from '@src/auth/resolveJwksUrl.js';
import { appConfig } from '@src/appConfig.js';

export type AzureB2CDecodedJwt = JwtPayload & {
  given_name: string;
  family_name: string;
};

export const createValidator =
  (wellKnownEndpoint: string) =>
  async (jwt: string): Promise<AzureB2CDecodedJwt> => {
    const { audience, issuer } = appConfig.auth;

    const jwksUriResolver = createResolver(wellKnownEndpoint);
    const jwksUri = await jwksUriResolver();

    const response = await verify(jwt, {
      jwksUri,
      audience,
      issuer,
    });

    return response as AzureB2CDecodedJwt;
  };
