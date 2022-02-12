import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Collection } from './collection.entity';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@ApiTags('收藏管理')
@ApiBearerAuth()
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiOperation({ summary: '创建收藏' })
  @ApiResponse({ type: Collection })
  @Post()
  async create(
    @Request() req,
    @Body() createCollectionDto: CreateCollectionDto,
  ) {
    return this.collectionService.create(req.user.id, createCollectionDto);
  }

  @ApiOperation({ summary: '收藏列表' })
  @ApiResponse({ type: [Collection] })
  @Get()
  async findAll(@Request() req) {
    const { id, isAdmin } = req.user;
    if (isAdmin) {
      this.collectionService.findAll();
    } else {
      return this.collectionService.findAllByUserId(id);
    }
  }

  @ApiOperation({ summary: '收藏详情' })
  @ApiResponse({ type: Collection })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.collectionService.findOne(id);
  }

  @ApiOperation({ summary: '更新收藏' })
  @Patch('id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    await this.collectionService.update(id, updateCollectionDto);
    return updateCollectionDto;
  }

  @ApiOperation({ summary: '删除收藏' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.collectionService.remove(id);
    return { id };
  }
}
