import { POSTGRESQL_BOOKING_CONNECTION } from '@app/environment';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forRoot({
      ...datasource.options,
      autoLoadEntities: true,
      cache: {
        type: 'database',
        tableName: 'QueryResultCache',
      }
    }),

    TypeOrmModule.forFeature([BusinessType], POSTGRESQL_BOOKING_CONNECTION),
    TypeOrmModule.forFeature([Company], POSTGRESQL_BOOKING_CONNECTION),
    TypeOrmModule.forFeature([CompanyContact], POSTGRESQL_BOOKING_CONNECTION),
    TypeOrmModule.forFeature([ContactType], POSTGRESQL_BOOKING_CONNECTION),
    TypeOrmModule.forFeature([Employee], POSTGRESQL_BOOKING_CONNECTION),
    TypeOrmModule.forFeature([Login], POSTGRESQL_BOOKING_CONNECTION),
    TypeOrmModule.forFeature([Partner], POSTGRESQL_BOOKING_CONNECTION),
    TypeOrmModule.forFeature([Schedule], POSTGRESQL_BOOKING_CONNECTION),
    TypeOrmModule.forFeature([Service], POSTGRESQL_BOOKING_CONNECTION),
    TypeOrmModule.forFeature([User], POSTGRESQL_BOOKING_CONNECTION),
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class BookingDBModule {
}
