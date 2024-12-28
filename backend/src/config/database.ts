import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Ensure dotenv is loading the .env file

console.log('Database Config:', {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    logging: console.log, // Optional: Logs SQL queries for debugging
  }
);

export default sequelize;
