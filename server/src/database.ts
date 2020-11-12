import { Pool } from 'pg';

export const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'bookmarks_db',
    port: 5434
});