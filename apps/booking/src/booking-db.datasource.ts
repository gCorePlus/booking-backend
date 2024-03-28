import { DataSource } from 'typeorm';
import { ConnectionOptions } from 'typeorm-seeding/dist/connection';
import options from './booking-db.ormconfig';

export default new DataSource(options as ConnectionOptions);
