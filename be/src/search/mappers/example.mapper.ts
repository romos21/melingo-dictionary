import { ParsedItemDto } from '../dtos/parsed-item.dto';
import { ExampleDto } from '../dtos/example.dto';

export class ExampleMapper {
  toExampleEntity(item: ParsedItemDto): ExampleDto {
    const { ID, Text, MelingoID } = item;
    return {
      id: Number(ID),
      content: Text,
      entry: { id: Number(MelingoID) },
    };
  }
}
