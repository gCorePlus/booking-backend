import { MigrationUtils } from '@app/common';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { COMMON_DATE_COLUMNS } from './commons';

export class CreateTablePartnerCompany1711215010340 implements MigrationInterface {

  public async up(qr: QueryRunner): Promise<void> {
    const table: Table = new Table({
      name: 'PartnerCompany',
      columns: [
        { name: 'IdPartner', isPrimary: true, type: MigrationUtils.getId(qr), isNullable: false, primaryKeyConstraintName: 'PK_PartnerCompany_IdPartner' },
        { name: 'IdCompany', isPrimary: true, type: MigrationUtils.getId(qr), isNullable: false, primaryKeyConstraintName: 'PK_PartnerCompany_IdCompany' },
        // Default Columns
        ...COMMON_DATE_COLUMNS
      ],
      foreignKeys: [
        { name: 'FK_PartnerCompany__Partner_Id', columnNames: ['IdPartner'], referencedTableName: 'Partner', referencedColumnNames: ['Id'] },
        { name: 'FK_PartnerCompany__Company_Id', columnNames: ['IdCompany'], referencedTableName: 'Company', referencedColumnNames: ['Id'] }
      ]
    });
    await qr.createTable(table);
  }

  public async down(qr: QueryRunner): Promise<void> {
    const table: Table = await qr.getTable('PartnerCompany');
    await qr.dropTable(table);
  }

}
