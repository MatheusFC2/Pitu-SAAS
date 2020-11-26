"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./database"));
dotenv_1.default.config();
const { PORT } = process.env;
database_1.default.sync(); //{ force: true }); // "force: true", força a criação da tabela. Usar apenas em desenvolvimento
console.log('Database running at 3306');
const APP_PORT = process.env.PORT || 3001;
app_1.default.listen(APP_PORT);
console.log(`'Server running at ${APP_PORT}'`);
