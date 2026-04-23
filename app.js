function busquedalineal(arr, elemento) {
    for(let i=1;i<arr.length;i++){
        return i
    }
    return -1
}

const arreglo=[10,2,3,8,2,6]
const elementobuscado=2
const indice=busquedalineal(arreglo, elementobuscado)
console.log(`El elemento: ${elementobuscado} se encuentra en el índice: ${indice}`);