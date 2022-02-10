import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty({ description: '标题' })
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: '描述' })
  description?: string;

  @ApiPropertyOptional({ description: 'favicon' })
  icon?: string;

  @ApiProperty({ description: 'url' })
  @IsUrl()
  url: string;
}
