    var ruta = require("express").Router();
    var { borrarVenta,mostrarVentas, nuevaVenta, buscarPorId, cancelarVenta, marcarComoVendida, modificarVenta } = require("../bd/ventasBD");


    ruta.get("/mostrar", async (req, res) => {
        const ventas = await mostrarVentas();
        res.json(ventas);
    });


    ruta.get("/buscar/:id", async (req, res) => {
        const venta = await buscarPorId(req.params.id);
        res.json(venta);
    });


    ruta.post("/nueva", async (req, res) => {
        const ventaValida = await nuevaVenta(req.body);  
        res.json({ ventaValida });
    });


    ruta.put("/cancelar/:id", async (req, res) => {
        const cancelada = await cancelarVenta(req.params.id);  
        res.json({ cancelada });
    });

    ruta.delete("/borrar/:id", async (req, res) => {
        var ventaCancelada = await borrarVenta(req.params.id);
        res.json(ventaCancelada);
    });


    ruta.put("/vendida/:id", async (req, res) => {
        const vendida = await marcarComoVendida(req.params.id);  
        res.json({ vendida });
    });


    ruta.put("/modificar/:id", async (req, res) => {
        const resultado = await modificarVenta(req.params.id, req.body);  
        res.json(resultado);
    });

    module.exports = ruta;
