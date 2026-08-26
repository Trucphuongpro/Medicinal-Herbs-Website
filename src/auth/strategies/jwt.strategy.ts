import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { UserRole } from '../../users/enum/enum.userrole';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  //tại sao lại dùng JwtPayload mà không phải any: để đảm bảo payload có cấu trúc đầu vào đúng như mong đợi.
  async validate(payload: JwtPayload) {
    // Token hợp lệ về chữ ký vẫn có thể trỏ tới tài khoản đã bị xoá hoặc bị khoá
    // (ví dụ sau khi seed lại database). Đối chiếu với DB để trả 401 thay vì để
    // controller trả về dữ liệu rỗng.
    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Tài khoản không còn tồn tại');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('Tài khoản đã bị khoá');
    }

    // Lấy role từ DB để thay đổi quyền có hiệu lực ngay, không phải chờ token hết hạn.
    return {
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
    };
  }
}
