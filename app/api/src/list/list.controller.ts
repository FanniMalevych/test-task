import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
  } from '@nestjs/common';
import { ListService } from './list.service';
import { List } from './list.entity';
import { ListDTO } from './list.dto';
  
  @Controller('list')
  export class ListController {
    constructor(private readonly listService: ListService) {}
  
    @Get()
    async findAll(): Promise<List[]> {
      return this.listService.findAll();
    }
  
    @Post()
    async create(@Body() listData: ListDTO): Promise<List> {
      return this.listService.createList(listData);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() listData: ListDTO): Promise<List> {
      return this.listService.updateList(id, listData);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
      return this.listService.delete(id);
    }
  }
  