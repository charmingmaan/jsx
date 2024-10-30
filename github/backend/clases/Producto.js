class Producto {
    constructor(data) {
        this.id = data.id;
        this.producto = data.producto;
        this.existencias = data.existencias;
        this.precio = data.precio;
    }

    set id(id) {
        this._id = id;
    }
    
    set producto(producto) {
        const productoRegex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/;
        if (productoRegex.test(producto)) {
            this._producto = producto;
        }
    }
    
    set existencias(existencias) {
        const existenciasRegex = /^\d+$/;  
        if (existenciasRegex.test(existencias)) {
            this._existencias = parseInt(existencias, 10);
        }
    }
    
    set precio(precio) {
        const precioRegex = /^\d+(\.\d+)?$/;
        if (precioRegex.test(precio)) {
            this._precio = parseFloat(precio);
        }
    }
    
    get id() {
        return this._id;
    }
    
    get producto() {
        return this._producto;
    }
    
    get existencias() {
        return this._existencias;
    }
    
    get precio() {
        return this._precio;
    }
    
    get getProducto() {
        const conid = {
            id: this._id,
            producto: this._producto,
            existencias: this._existencias,
            precio: this._precio,
        }
        const sinid = {
            producto: this._producto,
            existencias: this._existencias,
            precio: this._precio,
        }
        return this.id != undefined ? conid : sinid;
    }
}

module.exports = Producto;
