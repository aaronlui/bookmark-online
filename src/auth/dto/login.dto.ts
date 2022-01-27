import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '用户名' })
  @IsAlphanumeric()
  username: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  password: string;
}
