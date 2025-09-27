import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const { Pool } = pg;

// Prefer DATABASE_URL (Render/Heroku style). Fallback to discrete vars.
const { DATABASE_URL } = process.env;
const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);

const pool = DATABASE_URL
    ? new Pool({
            connectionString: DATABASE_URL,
            ssl: process.env.PGSSL_DISABLE === 'true' ? false : { rejectUnauthorized: false },
        })
    : new Pool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: DB_PORT,
            database: process.env.DB_NAME,
            ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
        });

export default pool;

// Attach notice listener
pool.on('connect', (client) => {
    client.on('notice', (msg) => console.log('Notice:', msg.message));
});

// Optional, one-time bootstrap guarded by env flag. Avoids running on every boot.
export async function bootstrapDatabase() {
    //if (process.env.DB_BOOTSTRAP !== 'true') return;
    try {
        await pool.query('CALL create_all_tables();');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
    try {
        await pool.query('CALL init_donuts();');
    } catch (error) {
        console.error('Error initializing donuts:', error);
    }
}
