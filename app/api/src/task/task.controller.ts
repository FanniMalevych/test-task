import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { TaskDTO } from './task.dto';
  import { TaskService } from './task.service';
  
  @Controller('tasks')
  export class TaskController {
    constructor(private readonly taskService: TaskService) {}
  
    @Get()
    async findAll() {
      return this.taskService.findAllTasks();
    }
  
    @Post()
    async create(@Body() createTask: TaskDTO) {
      return this.taskService.createTask(createTask);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.taskService.viewTask(id);
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateTask: TaskDTO) {
      return this.taskService.updateTask(id, updateTask);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number) {
      return this.taskService.deleteTask(id);
    }
  }
  