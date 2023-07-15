import { Router } from "express";

import fs from "fs/promises";

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let pathAnimales = path.resolve(__dirname, "../database/animales.json");


const router = Router();

//traer todos los animales
router.get("/", async (req, res) => {
    
    let data = await fs.readFile(pathAnimales, "utf8");
    data = JSON.parse(data);

    res.render("home", {
        animales: data.animales
    });
});

export default router;
