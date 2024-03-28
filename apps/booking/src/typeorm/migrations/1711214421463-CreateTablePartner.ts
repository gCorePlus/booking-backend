import { MigrationUtils } from '@app/common/migrations/migration.utils';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { COMMON_DATE_COLUMNS } from './commons';

export class CreateTablePartner1711214421463 implements MigrationInterface {

  public async up(qr: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'Partner',
      columns: [
        { name: 'Id', isPrimary: true, type: MigrationUtils.getId(qr), primaryKeyConstraintName: 'PK_Partner_Id' },
        { name: 'IdLogin', type: MigrationUtils.getId(qr), isNullable: false },
        // Default Columns
        ...COMMON_DATE_COLUMNS
      ],
      foreignKeys: [
        { name: 'FK_Partner__Login_Id', columnNames: ['IdLogin'], referencedTableName: 'Login', referencedColumnNames: ['Id'] }
      ]
    });
    await qr.createTable(table);
  }

  public async down(qr: QueryRunner): Promise<void> {
    const table: Table = await qr.getTable('Partner');
    await qr.dropTable(table);
  }

}
