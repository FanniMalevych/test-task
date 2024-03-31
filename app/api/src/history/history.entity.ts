import { Task } from 'src/task/task.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  action!: string;

  @ManyToOne(() => Task, (task) => task.history, { onDelete: 'CASCADE' })
  task: Task;

  @Column()
  taskId: number;

  @Column({ type: 'date' })
  createdAt: Date;
}
