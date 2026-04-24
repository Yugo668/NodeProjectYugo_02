function calculadora(a, b, operacion) {
    let resultado;
    switch (operacion) {
        case '+':
            resultado = a + b;
            break;
        case '-':
            resultado = a - b;
            break;
        case '*':
            resultado = a * b;
            break;
        case '/':
            if (b === 0) {
                return "Error: No se puede dividir entre cero";
            }
            resultado = a / b;
            break;
        default:
            return "Operación no válida";
    }
    return resultado;
}
console.log(`Suma: ${calculadora(10, 5, '+')}`);
console.log(`División: ${calculadora(10, 2, '/')}`);
console.log(`Multiplicación: ${calculadora(8, 4, '*')}`);