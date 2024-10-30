var ruta = require("express").Router();

var { mostrarUsuarios, nuevoUsuario, borrarUsuario, buscarPorId, modificarUsuario } = require("../bd/usuariosBD");

ruta.get("/mostrar",async(req,res)=>{

    const usuarios=await mostrarUsuarios();

    res.json(usuarios);
});

ruta.get("/buscar/:id", async(req, res)=>{
    var usuarioValido= await buscarPorId(req.params.id);
    res.json(usuarioValido);
});

ruta.delete("/borrar/:id",async(req,res)=>{
    var borrado=await borrarUsuario(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevo",async(req,res)=>{
    var usuarioValido = await nuevoUsuario(req.body);
    res.json(usuarioValido);
});

ruta.put("/modificar/:id", async (req, res) => {
    const id = req.params.id;
    const datosNuevos = req.body;
    const resultado = await modificarUsuario(id, datosNuevos);
    res.json(resultado);
});


module.exports=ruta; 