import { MigrationUtils } from '@app/common/migrations/migration.utils';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { COMMON_DATE_COLUMNS } from './commons';

export class CreateTableCompanyContact1711215367934 implements MigrationInterface {

  public async up(qr: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'CompanyContact',

      columns: [
        { name: 'Id', isPrimary: true, type: MigrationUtils.getId(qr), isNullable: false, primaryKeyConstraintName: 'PK_CompanyContact_Id' },

        { name: 'IdCompany', type: MigrationUtils.getId(qr), isNullable: false },
        { name: 'IdContactType', type: MigrationUtils.getId(qr), isNullable: false },

        { name: 'Value', type: MigrationUtils.getString(qr), precision: 255, isNullable: false },
        // Default Columns
        ...COMMON_DATE_COLUMNS
      ],

      foreignKeys: [
        { name: 'FK_CompanyContact__Company_Id', columnNames: ['IdCompany'], referencedTableName: 'Company', referencedColumnNames: ['Id'] },
        { name: 'FK_CompanyContact__ContactType_Id', columnNames: ['IdContactType'], referencedTableName: 'ContactType', referencedColumnNames: ['Id'] }
      ]
    });
    await qr.createTable(table);
  }

  public async down(qr: QueryRunner): Promise<void> {
    const table: Table = await qr.getTable('CompanyContact');
    await qr.dropTable(table);
  }

}
