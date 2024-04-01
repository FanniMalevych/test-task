import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './history.entity';
import { HistoryDTO } from './history.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async addHistory(historyToAdd: HistoryDTO): Promise<History> {
    const history = new History();
    history.action = historyToAdd.action;   
    history.createdAt = `${new Date().toISOString().slice(0, 10)} at ${new Date().getHours()}:${new Date().getMinutes()}`;
    history.taskId = historyToAdd.taskId;

    return this.historyRepository.save(history);
  }

  async findAllHistory(): Promise<History[]> {
    return this.historyRepository.find();
  }

  async deleteTaskHistory(taskId: number): Promise<void> {
    await this.historyRepository.delete({ taskId });
  }
}
