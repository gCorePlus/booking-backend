import { MigrationUtils } from '@app/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { COMMON_DATE_COLUMNS } from './commons';

export class CreateTableBusinessType1711214503389 implements MigrationInterface {

  public async up(qr: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'BusinessType',
      columns: [
        { name: 'Id', isPrimary: true, type: MigrationUtils.getId(qr), primaryKeyConstraintName: 'PK_BusinessType_Id' },
        { name: 'Name', type: MigrationUtils.getString(qr), precision: 255, isNullable: false },
        // Default Columns
        ...COMMON_DATE_COLUMNS
      ],
    });
    await qr.createTable(table);
  }

  public async down(qr: QueryRunner): Promise<void> {
    const table: Table = await qr.getTable('BusinessType');
    await qr.dropTable(table);
  }

}
