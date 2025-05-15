const { Pool } = require('pg');
import pgPromise from 'pg-promise';

const pgp = pgPromise({});
const db = pgp('zombieplus://postgres:pwd123@localhost:5432/zombieplus');

export async function executeSQL(sqlScript) {
  try{
    const result = await db.any(sqlScript);
    console.log(result.rows)
}catch (error) {
    console.error('Error executing SQL script:', error);
  }
}