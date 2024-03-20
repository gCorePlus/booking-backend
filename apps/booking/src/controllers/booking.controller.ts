import { Controller, Get } from '@nestjs/common';
import { BookingService } from '../services';

@Controller('booking')
export class BookingController {

  constructor(private readonly bookingService: BookingService) {}

  @Get()
  getHello(): any {
    return { msg: this.bookingService.getHello() };
  }
}
