import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchModule } from './search/search.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DB_URL,
        synchronize: process.env.SYNCRONYZE === 'true',
        entities: [process.env.ENTITIES],
        migrations: [process.env.MIGRATIONS],
        migrationsRun: true,
      }),
    }),
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
