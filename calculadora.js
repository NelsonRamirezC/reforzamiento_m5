const sumar = (a, b) => {
    a = Number(a);
    b = Number(b);

    if (isNaN(a) || isNaN(b)) return 0;
    let resultado = a + b;
    return resultado;
};

export default sumar;


