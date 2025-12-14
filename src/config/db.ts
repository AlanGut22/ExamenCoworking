import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DB_URI) {
    throw new Error("Falta la variable de entorno DB_URI");
}

const pool = mysql.createPool(process.env.DB_URI);

export default pool;