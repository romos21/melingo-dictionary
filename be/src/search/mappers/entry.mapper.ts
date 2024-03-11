import { Entry } from '../entities/entry.entity';

export class EntryMapper {
  toEntryEntity(item: any) {
    const { MelingoId, Entry, TranslationFull } = item;
    return {
      id: Number(MelingoId),
      name: Entry as string,
      translation: TranslationFull as string,
    };
  }
  toEntryResponse(item: Entry) {
    const { examples, ...rest } = item;
    return {
      examples: examples.map(({ content }) => content),
      ...rest,
    };
  }
}
