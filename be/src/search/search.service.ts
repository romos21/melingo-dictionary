import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Entry } from './entities/entry.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
  ) {}

  async findByName(name: string): Promise<Entry> {
    const data = await this.entryRepository.findOne({
      where: { name: Like(`%${name}%`) },
      relations: { examples: true },
    });
    return data;
  }
}
