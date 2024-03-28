import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export const COMMON_DATE_COLUMNS: TableColumnOptions[] = [
  {
    name: 'CreatedAt',
    type: 'timestamp',
    isNullable: true,
    default: 'now()',
  },
  {
    name: 'UpdatedAt',
    type: 'timestamp',
    isNullable: true,
  },
  {
    name: 'DeletedAt',
    type: 'timestamp',
    isNullable: true,
  }
];
