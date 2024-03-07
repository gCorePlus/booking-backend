import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { BookingModule } from '../../booking/src/booking.module';

@Module({
  imports: [
    // Modules
    BookingModule,

    // Routes
    RouterModule.register([
      {
        path: '/api/v1',
        module: BookingModule
      },
    ]),
  ],
})
export class AppModule {}
