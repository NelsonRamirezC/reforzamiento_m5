import express from "express";

//importas de rutas
import animalesRoutes from "./routes/animales.routes.js";
import bodyParser from "body-parser";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor escuchando en puerto: " + PORT);
})


//RUTAS - ENDPOINTS

app.use("/api/v1/animales", animalesRoutes);