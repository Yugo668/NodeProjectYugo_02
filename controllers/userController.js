exports.getAllUsers=(req,res)=>{
    res.send("Obteniendo todos los usuarios")
}   

exports.getUserById=(req,res)=>{
    const userId=req.params.id;
    res.send('Obteniendo el usuario con ID:' + req.params.id)
}

exports.createUser=(req,res)=>{
    let daata=req.body;
    const {nombre, apellido, email, telefono}=data;
    console.log(nombre, apellido, email, telefono);
}

exports.updateUser=(req,res)=>{
    let data=req.body;
    const {nombre, apellido, email, telefono}=data;
    console.log(req.params.id);
    console.log(nombre, apellido, email, telefono);
}

exports.deleteUser=(req,res)=>{
    console.log(req.params.id);
    console.log('Usuario eliminado con ID:' + req.params.id);
}