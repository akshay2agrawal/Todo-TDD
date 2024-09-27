import knex from 'knex';
import knexConfig from './knexfile';

// Create a knex instance using the development environment configuration
const db = knex(knexConfig['development']);

export default db;
