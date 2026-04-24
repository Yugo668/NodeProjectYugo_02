function rotarHaciaLaDerecha(array, k) {
    let copia = [...array];
    for (let i = 0; i < k; i++) {
        let elUltimo = copia.pop();
        copia.unshift(elUltimo);
    }
    return copia;
}
const numerosParaRotar = [1, 2, 3, 4, 5];
const posiciones = 4;
console.log("Array rotado:", rotarHaciaLaDerecha(numerosParaRotar, posiciones));