import { Module } from '@nestjs/common';
import { BookingModule } from '../../booking/src';

@Module({
  imports: [
    // Modules
    BookingModule,
  ],
})
export class AppModule {}
