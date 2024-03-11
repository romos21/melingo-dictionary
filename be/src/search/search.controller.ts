import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { EntryMapper } from './mappers/entry.mapper';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @HttpCode(200)
  async getTranslations(@Query('word') name) {
    const translation = await this.searchService.findByName(name);
    if (!translation) {
      throw new NotFoundException('Translations not found');
    }
    return new EntryMapper().toEntryResponse(translation);
  }
}
