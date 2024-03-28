import { QueryRunner } from 'typeorm';

export class MigrationUtils {

  static getId(qr: QueryRunner): string {
    if (qr.connection.driver.options.type === 'spanner') return 'text';

    return 'uuid';
  }

  static getString(qr: QueryRunner): string {
    if (qr.connection.driver.options.type === 'spanner') return 'text';

    return 'varchar';
  }

  static getSmallInteger(qr: QueryRunner): string {
    if (qr.connection.driver.options.type === 'spanner') return 'numeric';

    return 'smallint';
  }
  static getCurrency(qr: QueryRunner): string {
    if (qr.connection.driver.options.type === 'spanner') return 'numeric';

    return 'decimal(12, 2)';
  }

  static getTimestamp(qr: QueryRunner) {
    if (qr.connection.driver.options.type === 'spanner') return 'timestamp';
    return 'timestamp';
  }
}
