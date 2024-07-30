import { Module } from '@nestjs/common';
import { BookingDBModule } from './booking-db.module';
import { CompanyContactsController, CompanyController, PartnerController, ScheduleController } from './controllers';
import { CompanyContactService, CompanyService, PartnerService, ScheduleService } from './services';

@Module({
  controllers: [CompanyController, CompanyContactsController, ScheduleController, PartnerController],
  providers: [CompanyService, CompanyContactService, ScheduleService, PartnerService],
  imports: [
    // Database
    BookingDBModule,
  ],
})
export class BookingAPIModule {
}
