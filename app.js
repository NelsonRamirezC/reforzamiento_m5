import express from "express";
import { create } from "express-handlebars";

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//importas de rutas
import animalesRoutes from "./routes/animales.routes.js";
import viewsRoutes from "./routes/views.routes.js";


const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuración handlebars
const hbs = create({
    partialsDir: [path.resolve(__dirname, "./views/partials/")],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//RUTAS - ENDPOINTS

app.use("/api/v1/animales", animalesRoutes);


//RUTAS DE VISTA
app.use("/", viewsRoutes);



export default app;