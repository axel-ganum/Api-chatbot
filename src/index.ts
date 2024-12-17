import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import cors from "cors";
import dotenv from "dotenv";
import User from "./entity/User" 
import authRoutes from "./routes/autRoutes";
import Message from "./entity/Message";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User,Message],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Conexión a la base de datos establecida");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos", error);
  });

export { AppDataSource };

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`servidor corriendo en http://localhost:${PORT}`);
});
