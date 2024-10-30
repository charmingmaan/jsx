class Venta {
    constructor(data) {
        this.id = data.id;
        this.idUsuario1 = data.idUsuario1;
        this.idProducto1 = data.idProducto1;
        this.cantidad = data.cantidad;  
        this.fecha = data.fecha;  
        this.estado = data.estado;
    }

    set id(id) {
        this._id = id;
    }

    set idUsuario1(idUsuario1) {
        this._idUsuario1 = idUsuario1;
    }

    set idProducto1(idProducto1) {
        this._idProducto1 = idProducto1;
    }

    set cantidad(cantidad) {
        this._cantidad = cantidad;  
    }

    set fecha(fecha) {
        this._fecha = fecha;  
    }

    set estado(estado) {
        this._estado = estado;
    }

    get getVenta() {
        const conid = {
            id: this._id,
            idUsuario1: this._idUsuario1,
            idProducto1: this._idProducto1,
            cantidad: this._cantidad,  
            fecha: this._fecha, 
            estado: this._estado
        };

        const sinid = {
            idUsuario1: this._idUsuario1,
            idProducto1: this._idProducto1,
            cantidad: this._cantidad,  
            fecha: this._fecha,  
            estado: this._estado
        };

        return this._id ? conid : sinid;
    }
}

module.exports = Venta;
