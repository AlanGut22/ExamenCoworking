import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql2.createPool({
    uri: process.env.DB_URI || "mysql://root:@localhost:3306/coworking_db",
});