import { MigrationInterface, QueryRunner } from 'typeorm';
import { parseEntriesCsv, parseExamplesCsv } from '../helpers/parseCsv';
import { Entry } from '../search/entities/entry.entity';

export class ParseDataFromCsv1709849273456 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE entry (
              id integer NOT NULL,
              name character varying NOT NULL, 
              translation character varying NOT NULL, 
              PRIMARY KEY (id)
            )`,
    );
    await queryRunner.query(
      `CREATE INDEX "entry_name_idx" ON "entry" ("name")`,
    );
    await queryRunner.query(
      `
        CREATE TABLE example (
          id integer NOT NULL,
          content character varying NOT NULL,
          entry_id integer,
          PRIMARY KEY (id)
        )`,
    );
    await queryRunner.query(
      `ALTER TABLE "example" ADD FOREIGN KEY ("entry_id") REFERENCES "entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    const entryIds = await parseEntriesCsv(queryRunner);
    await parseExamplesCsv(queryRunner, entryIds);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "example"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "entry"`);
  }
}
