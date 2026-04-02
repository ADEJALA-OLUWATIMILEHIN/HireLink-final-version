import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DATABASE_NAME!,
//   process.env.DATABASE_USER!,
//   process.env.DATABASE_PASSWORD,
//   {
//     host: process.env.DATABASE_HOST,
//     dialect: "postgres",
//     port: Number(process.env.DATABASE_PORT),
//     logging: true,
//   }
// );

const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  : new Sequelize(process.env.DATABASE_NAME!, process.env.DATABASE_USER!,  process.env.DATABASE_PASSWORD, { host: 'localhost', dialect: 'postgres' });

export default sequelize;
