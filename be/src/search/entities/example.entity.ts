import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne, PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Entry } from './entry.entity';

@Entity()
export class Example {
  @PrimaryColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Entry, (entry) => entry.examples)
  @JoinColumn({ name: 'entry_id' })
  entry: Entry;
}
