import { Entry } from '../entities/entry.entity';

export class ExampleDto {
  id: number;
  content: string;
  entry: Pick<Entry, 'id'>;
}
