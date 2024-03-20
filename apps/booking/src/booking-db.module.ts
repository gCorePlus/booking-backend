import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import datasource from './booking-db.datasource';
import { BOOKING_CONNECTION } from './booking.contants';
import {
  BusinessTypeEntity,
  CompanyEntity,
  EmployeeEntity,
  LoginEntity,
  PartnerEntity,
  ScheduleEntity,
  ServiceEntity,
  UserEntity,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...datasource.options,
      autoLoadEntities: true,
      cache: {
        type: 'database',
        tableName: 'QueryResultCache'
      }
    }),

    TypeOrmModule.forFeature([BusinessTypeEntity], BOOKING_CONNECTION),
    TypeOrmModule.forFeature([CompanyEntity], BOOKING_CONNECTION),
    TypeOrmModule.forFeature([EmployeeEntity], BOOKING_CONNECTION),
    TypeOrmModule.forFeature([LoginEntity], BOOKING_CONNECTION),
    TypeOrmModule.forFeature([PartnerEntity], BOOKING_CONNECTION),
    TypeOrmModule.forFeature([ScheduleEntity], BOOKING_CONNECTION),
    TypeOrmModule.forFeature([ServiceEntity], BOOKING_CONNECTION),
    TypeOrmModule.forFeature([UserEntity], BOOKING_CONNECTION),
  ],
  exports: [
    TypeOrmModule
  ]
})
export class BookingDBModule {}
