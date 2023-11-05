import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AgentAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      headers: { authorization }
    } = request;

    if (request) {
      if (!authorization) return false;
      request.user = await this.validateToken(authorization);
      return true;
    }
  }

  async validateToken(authHeader: string) {
    const [Bearer, token] = authHeader.split(' ');
    if (Bearer !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }

    try {
      const secret = process.env.JWT_AGENT_SECRET;
      return jwt.verify(token, secret);
    } catch ({ message, name }) {
      console.error(message, name);
      throw new HttpException(message || name, HttpStatus.UNAUTHORIZED);
    }
  }
}
