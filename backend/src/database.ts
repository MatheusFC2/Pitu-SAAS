import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const { DB_CONNECTION } = process.env;

const sequelize = new Sequelize(DB_CONNECTION as string);

export default sequelize;
