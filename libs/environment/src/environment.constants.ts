// General
export const DEFAULT_LOG_LEVEL = 'error';
export const DEFAULT_LOG_IGNORE = ['/health', '/favicon.ico'];

// DBBooking
export const POSTGRESQL_BOOKING_CONNECTION = 'BookingConnection';
export const POSTGRESQL_BOOKING_SCHEMA = process.env.POSTGRESQL_BOOKING_SCHEMA || 'booking';
