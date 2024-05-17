import { MigrationUtils } from '@app/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { COMMON_DATE_COLUMNS } from './commons';

export class CreateTableScheduleService1712029658370 implements MigrationInterface {

  public async up(qr: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'ScheduleService',

      columns: [
        { name: 'IdSchedule', isPrimary: true, type: MigrationUtils.getId(qr), isNullable: false, primaryKeyConstraintName: 'PK_ScheduleService_IdSchedule' },
        { name: 'IdService', isPrimary: true, type: MigrationUtils.getId(qr), isNullable: false, primaryKeyConstraintName: 'PK_ScheduleService_IdService' },
        // Default Columns
        ...COMMON_DATE_COLUMNS
      ],
      foreignKeys: [
        { name: 'FK_ScheduleService__Schedule_Id', columnNames: ['IdSchedule'], referencedTableName: 'Schedule', referencedColumnNames: ['Id'] },
        { name: 'FK_ScheduleService__Service_Id', columnNames: ['IdService'], referencedTableName: 'Service', referencedColumnNames: ['Id'] }
      ]
    });
    await qr.createTable(table);
  }

  public async down(qr: QueryRunner): Promise<void> {
    const table: Table = await qr.getTable('ScheduleService');
    await qr.dropTable(table);
  }

}
