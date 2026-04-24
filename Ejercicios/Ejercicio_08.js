const niveles = 4;
for (let i = niveles; i >= 1; i--) {
    let espacios = " ".repeat(niveles - i);
    let asteriscos = "*".repeat(i);
    console.log(espacios + asteriscos);
}