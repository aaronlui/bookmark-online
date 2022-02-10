import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionRepository } from 'src/repository/collection.repository';
import { UserRepository } from 'src/repository/user.repository';
import { UserModule } from 'src/user/user.module';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollectionRepository, UserRepository]),
    UserModule,
  ],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
