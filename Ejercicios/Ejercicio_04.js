function esPalindromoMatematico(numero) {
    if (numero < 0) return false;

    let original = numero;
    let invertido = 0;

    while (numero > 0) {
        let ultimoDigito = numero % 10;
        invertido = (invertido * 10) + ultimoDigito;
        numero = Math.floor(numero / 10);
    }

    return original === invertido;
}
const n = 1331;
console.log(`¿Es ${n} palíndromo?: ${esPalindromoMatematico(n)}`);