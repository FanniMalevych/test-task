import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task/task.entity';
import { List } from './list.entity';
import { TaskDTO } from 'src/task/task.dto';
import { ListDTO } from './list.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>,
  ) {}

  async findAll(): Promise<List[]> {
    return this.listRepository.find();
  }

  async createList(listData: ListDTO): Promise<List> {
    const list = new List();
    list.name = listData.name;
    return this.listRepository.save(list);
  }

  async updateList(id: number, listData: ListDTO): Promise<List> {
    const list = await this.listRepository.findOneBy({ id });
    list.name = listData.name;
    return this.listRepository.save(list);
  }

  async delete(id: number): Promise<void> {
    await this.listRepository.delete(id);
  }
}
