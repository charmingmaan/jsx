"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function ModificarProducto({ params }) {
    const router = useRouter();
    const { id } = params;
    const [producto, setProducto] = useState({ producto: '', precio: '', existencias: '' });

    useEffect(() => {
        // Cargar datos del producto al montar el componente
        axios.get(`http://localhost:3000/productos/mostrar/${id}`)
            .then(response => setProducto(response.data))
            .catch(error => console.error("Error al obtener producto:", error));
    }, [id]);

    const modificarProducto = async (e) => {
        e.preventDefault();
        const url = `http://localhost:3000/productos/modificar/${id}`;
        
        try {
            await axios.put(url, producto);
            router.push("/productos/mostrar");
        } catch (error) {
            console.error('Error al modificar el producto:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={modificarProducto} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <center><h1>Modificar Producto</h1></center>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="producto" className="form-label">Producto</label>
                            <input 
                                className="form-control" 
                                id="producto" 
                                required 
                                type="text" 
                                value={producto.producto} 
                                onChange={(e) => setProducto({ ...producto, producto: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="precio" className="form-label">Precio</label>
                            <input 
                                className="form-control" 
                                id="precio" 
                                required 
                                type="number" 
                                step="0.01" 
                                value={producto.precio} 
                                onChange={(e) => setProducto({ ...producto, precio: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="existencias" className="form-label">Stock</label>
                            <input 
                                className="form-control" 
                                id="existencias" 
                                required 
                                type="number" 
                                value={producto.existencias} 
                                onChange={(e) => setProducto({ ...producto, existencias: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <center>
                            <button className="btn btn-primary col-12" type="submit">Guardar Cambios</button>
                        </center>
                    </div>
                </div>
            </form>
        </div>
    );
}
