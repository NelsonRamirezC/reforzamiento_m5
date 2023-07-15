import { assert } from "chai";
import sumar from "../calculadora.js";

describe("FUNCIÓN SUMAR", () => {
    it("Suma 2 números enteros", (done) => {
        
        let resultado = sumar(2, 2);
        assert.equal(resultado, 4, "Error en suma de 2 + 2, con números enteros.");
        done();
    })
    it("Suma 2 números enteros, siendo un número un string y resultado debe ser un number", (done) => {
        let resultado = sumar(2, "2");
        assert.equal(
            resultado,
            4,
            "Error en suma de 2 + 2, con un número string."
        );
        assert.isNumber(resultado, "Resultado no es un número.");
        done();
    });
    it("Resultado de suma enviando una letra en uno de los 2 argumentos." , (done) => {
        let resultado = sumar(2, "a");
        assert.equal(
            resultado,
            0,
            "Si se detecta un argumento que no sea un número, devolver 0"
        );
        done();
    });
})
