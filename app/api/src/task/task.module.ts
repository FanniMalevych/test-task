import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { History } from 'src/history/history.entity';
import { List } from 'src/list/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, History, List])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
