import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskDTO } from './task.dto';
import { History } from 'src/history/history.entity';
import { List } from 'src/list/list.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(History) private historyRepository: Repository<History>,
    @InjectRepository(List) private listRepository: Repository<List>,
  ) {}

  async createTask(createTask: TaskDTO): Promise<Task> {
    const task: Task = new Task();
    task.name = createTask.name;
    task.listId = createTask.listId;
    task.description = createTask.description;
    task.due_date = createTask.dueDate;
    task.priority = createTask.priority;
    task.create_time = new Date()

    const list = await this.listRepository.findOneBy({ id: createTask.listId });

    task.list = list;
    task.listName = list.name;

    const res = await this.taskRepository.save(task);

    const history = new History();
    history.task = task;
    history.action = `You created task ${createTask.name}`;
    history.createdAt = new Date();
    await this.historyRepository.save(history);

    return res;
  }

  async findAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async viewTask(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  async updateTask(id: number, updateTask: TaskDTO): Promise<Task> {
    const task: Task = await this.taskRepository.findOneBy({ id });
    const history = new History();
    const listCurrent = await this.listRepository.findOneBy({
      id: task.listId,
    });
    const listUpd = await this.listRepository.findOneBy({
      id: updateTask.listId,
    });

    let action: string = '';

    if (task.name != updateTask.name) {
      action += ` You renamed the task from "${task.name}" to "${updateTask.name}".`;
    }
    if (task.description != updateTask.description) {
      action += ` You changed the description of the task.`;
    }
    if (task.due_date != updateTask.dueDate) {
      action += ` You changed task due date from ${task.due_date} to ${updateTask.dueDate}.`;
    }
    if (task.priority != updateTask.priority) {
      action += ` You changed priority from ${task.priority} to ${updateTask.priority}`;
    }
    if (listCurrent.name != listUpd.name) {
      action += ` You moved your task from ${listCurrent.name} to ${listUpd.name}`;
    }

    task.name = updateTask.name;
    task.listId = updateTask.listId;
    task.description = updateTask.description;
    task.due_date = updateTask.dueDate;
    task.priority = updateTask.priority;
    task.create_time = task.create_time;

    history.action = action;
    history.task = task;
    history.createdAt = new Date();
    await this.historyRepository.save(history);

    return this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
