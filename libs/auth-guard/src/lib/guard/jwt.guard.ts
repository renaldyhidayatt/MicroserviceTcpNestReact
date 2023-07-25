import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      const token = authHeader.split(' ')[1];
      request.headers.authorization = `Bearer ${token}`;
    }

    return request;
  }
}
