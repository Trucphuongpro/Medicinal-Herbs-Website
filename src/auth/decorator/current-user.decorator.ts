import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from '../../users/enum/enum.userrole';

export type CurrentUserPayload = {
  userId: string;
  email: string;
  role: UserRole;
};

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): CurrentUserPayload => {
    const req = ctx.switchToHttp().getRequest<{ user: CurrentUserPayload }>();
    if (!req.user) {
      throw new UnauthorizedException('Missing authenticated user');
    }
    return req.user;
  },
);
