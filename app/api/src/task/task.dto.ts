import { IsEnum } from 'class-validator';

export class TaskDTO {
  name!: string;
  listId!: number;
  listName?: string;
  description!: string;
  dueDate!: Date;
  @IsEnum(['low', 'high', 'medium'])
  priority!: string;
}
