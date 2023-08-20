import jwt_decode from 'jwt-decode';

export function decodeToken(token: string): any {
  try {
    const decoded: any = jwt_decode(token);
    return decoded;
  } catch (error) {
    return null;
  }
}
