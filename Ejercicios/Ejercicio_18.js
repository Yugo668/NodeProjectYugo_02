function fibonacci(n) {
    if (n < 2) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}
const numero = 11;
console.log(`El Fibonacci de ${numero} es: ${fibonacci(numero)}`);