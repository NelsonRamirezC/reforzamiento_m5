import { assert } from "chai";
import chaiHttp from "chai-http";
import chai from "chai";

import app from "../app.js";

chai.use(chaiHttp);

let servidor = app.listen(3000);

describe("VALIDACIÓN DE ENDPOINT CREATE ANIMALES", () => {
    it("Validar que código de respuesta sea un 201, respuesta contenga una propiedad animal y que sea un Object.", (done) => {
        
        let animal= {
            nombre: "Lagartija",
            propietario: "Miguel"
        }

        chai.request(servidor)
            .post("/api/v1/animales")
            .send(animal)
            .end((err, res) => {
                let respuesta = res.body;
                assert.equal(
                    res.status,
                    201,
                    "código de estaado de respuesta no coincide con 201."
                );
                assert.exists(respuesta.animal, "No existe propiedad animal en la respuesta.");
                assert.propertyVal(respuesta.animal, "nombre", "Lagartija", "Nombre de objeto devuelto no coincide.");
                assert.propertyVal(respuesta.animal, "propietario", "Miguel", "Nombre del propietario devuelto no coincide.");
                assert.exists(respuesta.animal.id , "Objeto devuelto no tiene propiedad id.")
                done();
            });
    });
});
