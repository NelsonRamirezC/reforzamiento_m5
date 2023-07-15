import fs from "fs/promises";
import { v4 as uuid } from "uuid";

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let pathAnimales = path.resolve(__dirname, "../database/animales.json");

export const findAll = async (req, res) => {
    try {
        let data = await fs.readFile(pathAnimales, "utf8");
        data = JSON.parse(data);
        res.status(200).json({
            code: 200,
            message: "OK",
            animales: data.animales,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error al leer los animales de la DB.",
        });
    }
};

export const findByPk = async (req, res) => {
    let id = req.params.id;
    try {
        let data = await fs.readFile(pathAnimales, "utf8");
        data = JSON.parse(data);

        let animalBuscado = data.animales.find((animal) => animal.id == id);

        if (!animalBuscado)
            return res.status(404).json({
                code: 404,
                message: `no existe en la base de datos un animal con el ID: ${id}`,
            });

        res.status(200).json({
            code: 200,
            message: "OK",
            animal: animalBuscado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error al leer el animal con ID: " + id,
        });
    }
};

export const create = async (req, res) => {
    try {
        let { nombre, propietario } = req.body;
        console.log(nombre, propietario);
        let nuevoAnimal = {
            id: uuid().slice(0, 6),
            nombre,
            propietario,
        };
        console.log(nuevoAnimal);
        let data = await fs.readFile(pathAnimales, "utf8");
        data = JSON.parse(data);
        data.animales.push(nuevoAnimal);
        await fs.writeFile(pathAnimales, JSON.stringify(data, null, 2), "utf8");

        res.status(201).json({
            code: 201,
            message: `Se ha creado con éxito el animal con ID: ${nuevoAnimal.id}`,
            animal: nuevoAnimal,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error al crear el nuevo animal",
        });
    }
};

export const deleteAnimal = async (req, res) => {
    let id = req.params.id;
    try {
        let data = await fs.readFile(pathAnimales, "utf8");
        data = JSON.parse(data);

        let index = data.animales.findIndex((animal) => animal.id == id);
        if (index < 0)
            return res
                .status(404)
                .json({
                    code: 404,
                    message:
                        "El animal que desea eliminar no se encuentra en la BD.",
                });

        let animalEliminado = data.animales.splice(index, 1);

        await fs.writeFile(pathAnimales, JSON.stringify(data, null, 2), "utf8");

        res.status(200).json({
            code: 200,
            message: "Se ha eliminado con éxito el animal con ID: " + id,
            data: animalEliminado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error al eliminar el animal con ID: " + id,
        });
    }
};

export const update = async (req, res) => {
    let id = req.params.id;
    try {
        let { nombre, propietario } = req.body;

        let data = await fs.readFile(pathAnimales, "utf8");
        data = JSON.parse(data);

        let animalBuscado = data.animales.find((animal) => animal.id == id);

        if (!animalBuscado)
            return res
                .status(404)
                .json({
                    code: 404,
                    message:
                        "El animal que desea modificar no se encuentra en la BD.",
                });

        animalBuscado.nombre = nombre || animalBuscado.nombre;
        animalBuscado.propietario = propietario || animalBuscado.propietario;

        await fs.writeFile(pathAnimales, JSON.stringify(data, null, 2), "utf8");

        res.status(201).json({
            code: 201,
            message: `Se ha modificado con éxito el animal con ID: ${id}`,
            animal: animalBuscado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error al modificar el anima con ID: "+ id,
        });
    }
};
