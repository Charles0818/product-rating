import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config()

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = 'postgresql://postgres:charlieboy@localhost:5432/product-rating';

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});
pool.connect().then(() => console.log('Connected to database'))
  .catch((err) => console.log(`Unable to connect to database, ${err}`));

const query = (text: string, params?: any[]) => pool.query(text, params);

export { query, pool }
