var ruta = require("express").Router();
var { mostrarProductos, nuevoProducto, borrarProducto, buscarPorId, modificarProducto } = require("../bd/productosBD");

ruta.get("/mostrar", async (req, res) => {
    const productos = await mostrarProductos();
    res.json(productos);
});

ruta.get("/buscar/:id", async (req, res) => {
    var productoValido = await buscarPorId(req.params.id);
    res.json(productoValido);
});

ruta.delete("/borrar/:id", async (req, res) => {
    var borrado = await borrarProducto(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevo", async (req, res) => {
    var productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

ruta.put("/modificar/:id", async (req, res) => {
    const productoModificado = await modificarProducto(req.params.id, req.body);
    res.json(productoModificado);
});

module.exports = ruta;
