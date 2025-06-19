import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

console.log('DB URL:', process.env.DATABASE_URL);
console.trace('Creating Pool here');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    user: 'userflowusers',
    database: 'UserFlowDB'
});

export default pool;
