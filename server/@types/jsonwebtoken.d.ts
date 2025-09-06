declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: number;
    email: string;
    iat?: number;
    exp?: number;
  }

  export function sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: jwt.Secret,
    options?: jwt.SignOptions
  ): string;

  export function verify(
    token: string,
    secretOrPublicKey: jwt.Secret | jwt.GetPublicKeyOrSecret,
    options?: jwt.VerifyOptions
  ): JwtPayload | string;

  export function decode(
    token: string,
    options?: jwt.DecodeOptions
  ): null | { [key: string]: any } | string;
}
