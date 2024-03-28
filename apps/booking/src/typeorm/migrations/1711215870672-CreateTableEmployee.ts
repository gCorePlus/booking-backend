import { MigrationUtils } from '@app/common/migrations/migration.utils';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { COMMON_DATE_COLUMNS } from './commons';

export class CreateTableEmployee1711215870672 implements MigrationInterface {

  public async up(qr: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'Employee',

      columns: [
        { name: 'Id', isPrimary: true, type: MigrationUtils.getId(qr), isNullable: false, primaryKeyConstraintName: 'PK_Employee_Id' },

        { name: 'IdCompany', type: MigrationUtils.getId(qr), isNullable: false },
        { name: 'IdPartner', type: MigrationUtils.getId(qr), isNullable: true },

        { name: 'Name', type: MigrationUtils.getString(qr), precision: 255, isNullable: true },
        // Default Columns
        ...COMMON_DATE_COLUMNS
      ],
      foreignKeys: [
        { name: 'FK_Employee__Company_Id', columnNames: ['IdCompany'], referencedTableName: 'Company', referencedColumnNames: ['Id'] },
        { name: 'FK_Employee__Partner_Id', columnNames: ['IdPartner'], referencedTableName: 'Partner', referencedColumnNames: ['Id'] },
      ]
    });
    await qr.createTable(table);
  }

  public async down(qr: QueryRunner): Promise<void> {
    const table: Table = await qr.getTable('Employee');
    await qr.dropTable(table);
  }

}
