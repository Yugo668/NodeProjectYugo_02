function esPrimo(numero) {
    if (numero <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(numero); i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return true;
}
const num = 5;
if (esPrimo(num)) {
    console.log(`${num} es un número primo.`);
} else {
    console.log(`${num} no es primo.`);
}