import { Router } from "express";
import { findAll, findByPk, create, deleteAnimal, update } from "../controllers/animales.controllers.js";

const router = Router();

//traer todos los animales
router.get("/", findAll);

//filtrar animales por id
router.get("/:id", findByPk);

//Crear un nuevo animal
router.post("/", create);

//aliminar animales por su id
router.delete("/:id", deleteAnimal);

//actualizar animal
router.put("/:id", update);






export default router;
