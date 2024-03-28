import { MigrationUtils } from '@app/common/migrations/migration.utils';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { COMMON_DATE_COLUMNS } from './commons';

export class CreateTableSchedule1711216963493 implements MigrationInterface {

  public async up(qr: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'Schedule',

      columns: [
        { name: 'Id', isPrimary: true, type: MigrationUtils.getId(qr), isNullable: false, primaryKeyConstraintName: 'PK_Schedule_Id' },

        { name: 'IdUser', type: MigrationUtils.getId(qr), isNullable: false },
        { name: 'IdEmployee', type: MigrationUtils.getId(qr), isNullable: false },

        { name: 'Start', type: MigrationUtils.getTimestamp(qr), isNullable: false },
        { name: 'End', type: MigrationUtils.getTimestamp(qr), isNullable: false },
        // Default Columns
        ...COMMON_DATE_COLUMNS
      ],
      foreignKeys: [
        { name: 'FK_Schedule__User_Id', columnNames: ['IdUser'], referencedTableName: 'User', referencedColumnNames: ['Id'] },
        { name: 'FK_Schedule__Employee_Id', columnNames: ['IdEmployee'], referencedTableName: 'Employee', referencedColumnNames: ['Id'] },
      ]
    });
    await qr.createTable(table);
  }

  public async down(qr: QueryRunner): Promise<void> {
    const table: Table = await qr.getTable('Schedule');
    await qr.dropTable(table);
  }

}
