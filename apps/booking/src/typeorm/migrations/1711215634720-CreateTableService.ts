import { MigrationUtils } from '@app/common/migrations/migration.utils';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { COMMON_DATE_COLUMNS } from './commons';

export class CreateTableService1711215634720 implements MigrationInterface {

  public async up(qr: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'Service',

      columns: [
        { name: 'Id', isPrimary: true, type: MigrationUtils.getId(qr), isNullable: false, primaryKeyConstraintName: 'PK_Service_Id' },

        { name: 'IdCompany', type: MigrationUtils.getId(qr), isNullable: false },

        { name: 'Title', type: MigrationUtils.getString(qr), precision: 255, isNullable: false },
        { name: 'Description', type: MigrationUtils.getString(qr), precision: 255, isNullable: false },
        { name: 'Time', type: MigrationUtils.getSmallInteger(qr), isNullable: false },
        { name: 'Price', type: MigrationUtils.getCurrency(qr), isNullable: false },
        // Default Columns
        ...COMMON_DATE_COLUMNS
      ],
      foreignKeys: [
        { name: 'FK_Service__Company_Id', columnNames: ['IdCompany'], referencedTableName: 'Company', referencedColumnNames: ['Id'] },
      ]
    });
    await qr.createTable(table);
  }

  public async down(qr: QueryRunner): Promise<void> {
    const table: Table = await qr.getTable('Service');
    await qr.dropTable(table);
  }

}
