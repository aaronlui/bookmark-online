import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsAlphanumeric()
  @MaxLength(20)
  username: string;

  @ApiProperty({ description: '邮箱' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  password: string;
}
