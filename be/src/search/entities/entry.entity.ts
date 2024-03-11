import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';
import { Example } from './example.entity';

@Entity()
export class Entry {
  @PrimaryColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Index()
  @Column({ name: 'name', type: 'varchar', unique: true })
  name: string;

  @Column({ name: 'translation', type: 'varchar' })
  translation: string;

  @OneToMany(() => Example, (example) => example.entry)
  examples: Example[];
}
