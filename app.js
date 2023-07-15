import express from "express";

//importas de rutas
import animalesRoutes from "./routes/animales.routes.js";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//RUTAS - ENDPOINTS

app.use("/api/v1/animales", animalesRoutes);


export default app;