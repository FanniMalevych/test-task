import { History } from 'src/history/history.entity';
import { List } from 'src/list/list.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => List, (list) => list.tasks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  list: List;

  @Column()
  listId: number;

  @Column()
  listName: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'date' })
  create_time: Date;

  @Column({ type: 'date' })
  due_date: Date;

  @Column({ type: 'enum', enum: ['low', 'high', 'medium'] })
  priority: string;

  @OneToMany(() => History, (history) => history.task, { onDelete: 'CASCADE' })
  history: History[];
}
