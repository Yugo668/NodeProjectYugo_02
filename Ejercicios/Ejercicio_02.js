function esBisiesto(año) {
    return (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0);
}
const año = 2019
if (esBisiesto(año)) {
    console.log(`${año} es un año bisiesto.`);
} else {
    console.log(`${año} no es un ano bisiesto.`);
}