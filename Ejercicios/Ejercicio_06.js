function encontrarMCD(a, b) {
    while (b !== 0) {
        let temporal = b;
        b = a % b;
        a = temporal;
    }
    return a;
}
const num1 = 48;
const num2 = 18;
console.log(`El MCD de ${num1} y ${num2} es: ${encontrarMCD(num1, num2)}`);