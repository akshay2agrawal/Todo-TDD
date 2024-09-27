import { knex, type Knex } from 'knex';

// Update with your config settings.

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'pct-digital',
      user: 'postgres',
      password: 'akshay@postgres',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default knexConfig;
