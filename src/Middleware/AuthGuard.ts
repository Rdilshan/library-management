import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new HttpException(
        'Authorization token not found',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = this.jwtService.verify(token);

    if (payload['role'] !== 'Super') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    console.log('Token is valid:', payload);

    return true;
  }
}
