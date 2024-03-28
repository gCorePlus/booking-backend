import { MigrationUtils } from '@app/common/migrations/migration.utils';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { COMMON_DATE_COLUMNS } from './commons';

export class CreateTableContactType1711215276565 implements MigrationInterface {

  public async up(qr: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'ContactType',
      columns: [
        { name: 'Id', isPrimary: true, type: MigrationUtils.getId(qr), isNullable: false, primaryKeyConstraintName: 'PK_ContactType_Id' },

        { name: 'Name', type: MigrationUtils.getString(qr), precision: 255, isNullable: false },
        { name: 'Label', type: MigrationUtils.getString(qr), precision: 255, isNullable: false },
        // Default Columns
        ...COMMON_DATE_COLUMNS
      ],
    });
    await qr.createTable(table);
  }

  public async down(qr: QueryRunner): Promise<void> {
    const table: Table = await qr.getTable('ContactType');
    await qr.dropTable(table);
  }

}
