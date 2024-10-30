const {ventasBD}=require("./conexion"); 
const admin = require('firebase-admin'); 

const estadoPermitidos = ["pendiente", "vendido", "cancelado"];

function timestampToReadableDate(timestamp) {
    const date = new Date(timestamp._seconds * 1000); 
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}



async function mostrarVentas() {
    const ventasSnapshot = await ventasBD.get();  
    const ventas = [];
    ventasSnapshot.forEach(doc => {
        const data = doc.data();
        if (data.fecha && data.fecha._seconds) {
            data.fecha = timestampToReadableDate(data.fecha); 
        }
        ventas.push({ id: doc.id, ...data });
    });
    return ventas;
}


async function buscarPorId(id) {
    const ventaDoc = await ventasBD.doc(id).get();
    if (!ventaDoc.exists) {
        return null;  
    }
    
    const data = ventaDoc.data();
    if (data.fecha && data.fecha._seconds) {
        data.fecha = timestampToReadableDate(data.fecha); 
    }
    
    return { id: ventaDoc.id, ...data };
}


async function nuevaVenta(data) {

    const fecha = admin.firestore.Timestamp.now();  


    const venta = {
        cantidad: data.cantidad || 0, 
        idProducto1: data.idProducto1 || null, 
        idUsuario1: data.idUsuario1 || null, 
        estado: data.estado || "pendiente",  
        fecha: fecha  
    };


    if (!venta.idProducto1 || !venta.idUsuario1) {
        throw new Error("Los campos 'idProducto1' y 'idUsuario1' son obligatorios.");
    }

    const nuevaVentaRef = await ventasBD.add(venta);  
    return nuevaVentaRef.id;  
}


async function modificarVenta(id, data) {
    const venta = await buscarPorId(id);
    if (!venta) {
        return { error: "La venta no existe" };  
    }


    await ventasBD.doc(id).update({
        cantidad: data.cantidad || venta.cantidad,
        idProducto1: data.idProducto1 || venta.idProducto1,
        idUsuario1: data.idUsuario1 || venta.idUsuario1,
        estado: data.estado || venta.estado,
        fecha: data.fecha ? admin.firestore.Timestamp.fromDate(new Date(data.fecha)) : venta.fecha
    });

    return { success: true, message: "Venta modificada con éxito." };
}


async function actualizarestado(id, nuevoestado) {
    if (!estadoPermitidos.includes(nuevoestado)) {
        return { error: "estado no permitido. Debe ser 'pendiente', 'vendido' o 'cancelado'." };
    }

    const venta = await buscarPorId(id);
    if (!venta) {
        return { error: "La venta no existe" };  
    }

    await ventasBD.doc(id).update({ estado: nuevoestado });
    return { success: true, message: `Venta actualizada a '${nuevoestado}' con éxito.` };
}


async function cancelarVenta(id) {
    return await actualizarestado(id, "cancelado");
}

async function borrarVenta(id) {
    var ventaCancelada = false;
    const venta = await buscarPorId(id);  // Verificar si la venta existe

    if (venta != undefined) {
        console.log("Se cancelará la venta");
        await ventasBD.doc(id).update({ estado: "cancelado" });
        ventaCancelada = true;
    }
    return ventaCancelada;
}


async function marcarComoVendida(id) {
    return await actualizarestado(id, "vendido");
}

module.exports = {
    mostrarVentas,
    nuevaVenta,
    buscarPorId,
    cancelarVenta,
    marcarComoVendida,
    modificarVenta,
    borrarVenta  
};
