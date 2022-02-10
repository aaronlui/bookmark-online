import { Collection } from 'src/collection/collection.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Collection)
export class CollectionRepository extends Repository<Collection> {}
