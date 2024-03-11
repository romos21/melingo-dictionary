import { Controller, Get, HttpCode, HttpStatus, NotFoundException, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { EntryMapper } from './mappers/entry.mapper';
import { EntryResponseDto } from './dtos/entry-response.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getTranslations(@Query('word') name): Promise<EntryResponseDto> {
    const translation = await this.searchService.findByName(name);
    if (!translation) {
      throw new NotFoundException('Translations not found');
    }
    return new EntryMapper().toEntryResponse(translation);
  }
}
