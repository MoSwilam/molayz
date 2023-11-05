import { CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
export declare class AgentAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
    validateToken(authHeader: string): Promise<string | jwt.JwtPayload>;
}
