import { MigrationUtils } from '@app/common/migrations/migration.utils';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { COMMON_DATE_COLUMNS } from './commons';

export class CreateTableLogin1711213025178 implements MigrationInterface {

  public async up(qr: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'Login',
      columns: [
        { name: 'Id', isPrimary: true, type: MigrationUtils.getId(qr), primaryKeyConstraintName: 'PK_Login_Id' },
        { name: 'Name', type: MigrationUtils.getString(qr), precision: 255, isNullable: false },
        { name: 'Email', type: MigrationUtils.getString(qr), precision: 255, isUnique: true, isNullable: false },
        // Default Columns
        ...COMMON_DATE_COLUMNS
      ],
    });
    await qr.createTable(table);
  }

  public async down(qr: QueryRunner): Promise<void> {
    const table: Table = await qr.getTable('Login');
    await qr.dropTable(table);
  }

}
