import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Collection {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '标题' })
  @Column({ length: 500 })
  title: string;

  @ApiProperty({ description: '描述' })
  @Column({ length: 500 })
  description?: string;

  @ApiProperty({ description: 'url' })
  @Column({ length: 500 })
  url: string;

  @ApiProperty({ description: 'favicon' })
  @Column({ length: 500 })
  icon?: string;

  @ManyToOne(() => User, (user) => user.collections)
  owner: User;
}
