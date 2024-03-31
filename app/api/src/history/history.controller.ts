import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryDTO } from './history.dto';
import { History } from './history.entity';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async findAll(): Promise<History[]> {
    return this.historyService.findAllHistory();
  }
  
  @Get()
  async find(@Param('id') id: number) {
    return this.historyService.findAllTaskHistory(id);
  }

  @Post()
  async create(@Body() historyToAdd: HistoryDTO) {
    return this.historyService.addHistory(historyToAdd);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.historyService.deleteTaskHistory(id);
  }
}
