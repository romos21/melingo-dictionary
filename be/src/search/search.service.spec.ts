import { Test, TestingModule } from '@nestjs/testing';
import { Like, Repository } from 'typeorm';
import { SearchService } from './search.service';
import { Entry } from './entities/entry.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Example } from './entities/example.entity';

describe('SearchTestService', () => {
  let searchService: SearchService;
  let entryRepository: Repository<Entry>;
  const testWord: string = 'cucu';

  beforeEach(async () => {
    const entryRepositoryToken = getRepositoryToken(Entry);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: entryRepositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    searchService = module.get<SearchService>(SearchService);
    entryRepository = module.get<Repository<Entry>>(entryRepositoryToken);
  });

  it('existed translation with examples check', async () => {
    const entry = new Entry();
    entry.id = 1;
    entry.name = 'cucumber';
    entry.translation = 'pepino';
    const example = new Example();
    example.id = 1;
    example.content = 'This strange creature is a sea cucumber.';
    example.entry = entry;
    entry.examples = [example];

    jest.spyOn(entryRepository, 'findOne').mockResolvedValueOnce(entry);

    const entryResponse = await searchService.findByName(testWord);

    expect(entryResponse).toBe(entry);
    expect(entryRepository.findOne).toHaveBeenCalledWith({
      where: { name: Like(`%${testWord}%`) },
      relations: { examples: true },
    });
  });

  it('existed translation without examples check', async () => {
    const entry = new Entry();
    entry.id = 1;
    entry.name = 'cucumber';
    entry.translation = 'pepino';
    entry.examples = [];

    jest.spyOn(entryRepository, 'findOne').mockResolvedValueOnce(entry);

    const entryResponse = await searchService.findByName(testWord);

    expect(entryResponse).toBe(entry);
    expect(entryRepository.findOne).toHaveBeenCalledWith({
      where: { name: Like(`%${testWord}%`) },
      relations: { examples: true },
    });
  });

  it('translation not found', async () => {
    jest.spyOn(entryRepository, 'findOne').mockResolvedValueOnce(null);
    const entry = await searchService.findByName(testWord);
    expect(entry).toBe(null);
  });
});
