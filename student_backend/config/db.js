import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    dialect: 'postgres',
    logging: false,
  }
);

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('PostgreSQL connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
