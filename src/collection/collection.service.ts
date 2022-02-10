import { Injectable } from '@nestjs/common';
import { CollectionRepository } from 'src/repository/collection.repository';
import { UserRepository } from 'src/repository/user.repository';
import { UserService } from 'src/user/user.service';
import { Collection } from './collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';

@Injectable()
export class CollectionService {
  constructor(
    private readonly userService: UserService,
    private readonly collectionRepository: CollectionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async create(userId: number, createCollectionDto: CreateCollectionDto) {
    const user = await this.userService.findOne(userId);
    const { title, description, icon, url } = createCollectionDto;

    const collection = new Collection();
    collection.title = title;
    collection.description = description;
    collection.icon = icon;
    collection.url = url;
    collection.owner = user;

    this.collectionRepository.save(collection);
  }

  async findAllByUserId(userId: number) {
    const user = await this.userRepository.findOne({
      relations: ['collections'],
      where: { id: userId },
    });
    return user ? user.collections : [];
  }
}
