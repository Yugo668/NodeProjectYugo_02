function generarFibonacci(n) {
    let serie = [0, 1];
    if (n <= 0) return "Por favor, pide más de 0 elementos.";
    if (n === 1) return [0];
    if (n === 2) return serie;

    for (let i = 2; i < n; i++) {
        let siguiente = serie[i - 1] + serie[i - 2];
        serie.push(siguiente);
    }
    return serie;
}
const elementos = 10;
console.log(`Serie de Fibonacci (${elementos} elementos):`);
console.log(generarFibonacci(elementos));