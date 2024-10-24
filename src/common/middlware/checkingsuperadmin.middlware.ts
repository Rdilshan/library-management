
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';


@Injectable()
export class SuperadminLoggerMiddleware implements NestMiddleware {

  constructor(
    private jwtService: JwtService,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new HttpException('Authorization token not found', HttpStatus.UNAUTHORIZED);
      }

      const payload = this.jwtService.verify(token);

      if (payload['role'] !== 'Super') {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      console.log('Token is valid:', payload);

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new HttpException('Token has expired', HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
    }
  }
}
