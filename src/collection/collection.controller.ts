import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';

@ApiTags('收藏管理')
@ApiBearerAuth()
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiOperation({ summary: '创建收藏' })
  @Post()
  async create(
    @Request() req,
    @Body() createCollectionDto: CreateCollectionDto,
  ) {
    return this.collectionService.create(req.user.id, createCollectionDto);
  }

  @ApiOperation({ summary: '查找用户创建的收藏' })
  @Get()
  async findAllByUserId(@Request() req) {
    return this.collectionService.findAllByUserId(req.user.id);
  }
}
