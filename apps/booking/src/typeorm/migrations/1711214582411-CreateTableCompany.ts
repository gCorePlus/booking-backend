import { MigrationUtils } from '@app/common/migrations/migration.utils';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { COMMON_DATE_COLUMNS } from './commons';

export class CreateTableCompany1711214582411 implements MigrationInterface {

  public async up(qr: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'Company',
      columns: [
        { name: 'Id', isPrimary: true, type: MigrationUtils.getId(qr), primaryKeyConstraintName: 'PK_Company_Id' },
        { name: 'IdBusinessType', type: MigrationUtils.getId(qr), isNullable: false },
        // Default Columns
        ...COMMON_DATE_COLUMNS
      ],
      foreignKeys: [
        { name: 'FK_Company__BusinessType_Id', columnNames: ['IdBusinessType'], referencedTableName: 'BusinessType', referencedColumnNames: ['Id'] }
      ]
    });
    await qr.createTable(table);
  }

  public async down(qr: QueryRunner): Promise<void> {
    const table: Table = await qr.getTable('Company');
    await qr.dropTable(table);
  }

}
