function sistemaLogin() {
    const usuarioReal = "admin";
    const claveReal = "1234";
    let intentos = 3;
    let loginExitoso = false;

    while (intentos > 0 && loginExitoso === false) {
        let usuarioEscrito = "admin";
        let claveEscrita = "1234";
        if (usuarioEscrito === usuarioReal && claveEscrita === claveReal) {
            console.log("Acceso Permitido");
            loginExitoso = true;
        } else {
            intentos = intentos - 1;
            console.log("Datos incorrectos. Intentos restantes: " + intentos);
        }
    }
    if (loginExitoso === false) {
        console.log("SISTEMA BLOQUEADO");
    }
}
sistemaLogin();