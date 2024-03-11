import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
