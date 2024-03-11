import { createReadStream } from 'fs';
import { parse } from '@fast-csv/parse';
import { ExampleMapper } from '../search/mappers/example.mapper';
import { EntryMapper } from '../search/mappers/entry.mapper';
import { Entry } from '../search/entities/entry.entity';
import { Example } from '../search/entities/example.entity';
import { QueryRunner } from 'typeorm';

export const parseCsv = <T>(filePath: string): Promise<T[]> => {
  const data = [];
  return new Promise((resolve, reject) => {
    return createReadStream(filePath)
      .pipe(parse({ headers: true }))
      .on('data', (row) => {
        data.push(row);
      })
      .on('error', (error) => {
        console.error(error);
        reject(error);
      })
      .on('end', (rowCount) => {
        console.log(`Parsed ${rowCount} rows`);
        resolve(data);
      });
  });
};

export const parseExamplesCsv = async (
  queryRunner: QueryRunner,
  entryIds: number[],
) => {
  const filePath = 'csv-data/examples.csv';
  const data = await parseCsv<any>(filePath);
  const examplesList = data.map((row) =>
    new ExampleMapper().toExampleEntity(row),
  );
  const filteredExamplesList = examplesList.filter((row) =>
    entryIds.includes(row.entry.id),
  );
  await queryRunner.manager.save(Example, filteredExamplesList, {
    chunk: 500,
  });
};

export const parseEntriesCsv = async (queryRunner) => {
  const filePath = 'csv-data/entries.csv';
  const data = await parseCsv<any>(filePath);
  const entriesList = data.map((row) => new EntryMapper().toEntryEntity(row));
  await queryRunner.manager.save(Entry, entriesList, {
    chunk: 500,
  });
  return entriesList.map((row) => row.id);
};
