import dotenv from 'dotenv';
import app from './app';
import database from './database';

dotenv.config();
const { PORT } = process.env;

database.sync(); //{ force: true }); // "force: true", força a criação da tabela. Usar apenas em desenvolvimento
console.log('Database running at 3306');

const APP_PORT = process.env.PORT || 3001;
app.listen(APP_PORT);
console.log(`'Server running at ${APP_PORT}'`);
