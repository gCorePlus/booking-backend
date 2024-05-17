import { PinoTypeOrmLogger } from '@app/common';
import { Environment, EnvironmentModule, POSTGRESQL_CONNECTION } from '@app/environment';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import datasource from './booking-db.datasource';
import {
  BusinessType,
  Company,
  CompanyContact,
  ContactType,
  Employee,
  Login,
  Partner,
  Schedule,
  Service,
  User,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: POSTGRESQL_CONNECTION,
      imports: [EnvironmentModule],
      inject: [Environment, PinoLogger],
      useFactory: (environment: Environment, logger: PinoLogger) => ({
        ...datasource.options,
        autoLoadEntities: true,
        logger: environment.POSTGRESQL_LOGGER || new PinoTypeOrmLogger(logger),
        cache: {
          type: 'database',
          tableName: 'CacheQueryResult',
        },
      }),
    }),

    TypeOrmModule.forFeature([BusinessType], POSTGRESQL_CONNECTION),
    TypeOrmModule.forFeature([Company], POSTGRESQL_CONNECTION),
    TypeOrmModule.forFeature([CompanyContact], POSTGRESQL_CONNECTION),
    TypeOrmModule.forFeature([ContactType], POSTGRESQL_CONNECTION),
    TypeOrmModule.forFeature([Employee], POSTGRESQL_CONNECTION),
    TypeOrmModule.forFeature([Login], POSTGRESQL_CONNECTION),
    TypeOrmModule.forFeature([Partner], POSTGRESQL_CONNECTION),
    TypeOrmModule.forFeature([Schedule], POSTGRESQL_CONNECTION),
    TypeOrmModule.forFeature([Service], POSTGRESQL_CONNECTION),
    TypeOrmModule.forFeature([User], POSTGRESQL_CONNECTION),
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class BookingDBModule {
}
