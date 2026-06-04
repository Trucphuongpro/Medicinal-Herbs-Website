import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import type { CurrentUserPayload } from './decorator/current-user.decorator';
import { RolesGuard } from './guards/roles/roles.guard';
import { Roles } from './decorator/roles.decorator';
import { UserRole } from '../users/enum/enum.userrole';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: CurrentUserPayload) {
    if (!user?.userId) {
      throw new UnauthorizedException('Missing authenticated user');
    }
    return this.authService.getMe(user.userId);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) // Chỉ cho phép người dùng có vai trò 'admin' truy cập endpoint này
  getAdminData() {
    return { message: 'This data is only accessible to admin users.' };
  }
}
