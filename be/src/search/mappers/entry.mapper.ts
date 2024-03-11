import { Entry } from '../entities/entry.entity';
import { EntryResponseDto } from '../dtos/entry-response.dto';
import { EntryDto } from '../dtos/entry.dto';
import { ParsedItemDto } from '../dtos/parsed-item.dto';

export class EntryMapper {
  toEntryEntity(item: ParsedItemDto): EntryDto {
    const { MelingoId, Entry, TranslationFull } = item;
    return {
      id: Number(MelingoId),
      name: Entry as string,
      translation: TranslationFull as string,
    };
  }

  toEntryResponse(item: Entry): EntryResponseDto {
    const { examples, ...rest } = item;
    return {
      examples: examples.map(({ content }) => content),
      ...rest,
    };
  }
}
