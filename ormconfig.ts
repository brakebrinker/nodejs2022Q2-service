import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { UserEntity } from './src/user/user.entity';
import { ArtistEntity } from './src/artist/artist.entity';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  synchronize: true,
  entities: [UserEntity, ArtistEntity],
  migrations: ['dist/migration/*.js'],
  migrationsRun: true,
});
