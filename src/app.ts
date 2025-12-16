import dotenv from "dotenv";
dotenv.config()
import usersRoutes from "./routes/users.routes"
import express from "express";
import { pool } from "./config/db";
import { logger } from "./middlewares/logger.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import roomsRoutes from "./routes/rooms.routes";
import bookingsRoutes from "./routes/bookings.routes";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(logger)

app.use("/users", usersRoutes)
app.use("/rooms", roomsRoutes)
app.use("/bookings", bookingsRoutes)

app.use(errorHandler)

pool.getConnection()
    .then(connection => {
        console.log("Conexión exitosa a MySQL");
        connection.release();

        app.listen(PORT, () => {
            console.log(`Servidor iniciado correctamente en http://localhost:` + PORT);
        });
    })
    .catch(() => {
        console.log("Error el conectarse a la base de datos");
    });