import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DB_URI) {
    throw new Error("DATABASE_URL is missing in .env");
}

const pool = mysql.createPool(process.env.DB_URI);

export default pool;