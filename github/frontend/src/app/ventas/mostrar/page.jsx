import BorrarVenta from "@/components/borrarVent"; // Asegúrate de tener este componente
import Link from "next/link";
import axios from "axios";

async function getVentas(){
    const url="http://localhost:3000/ventas/mostrar";
    const ventas = await axios.get(url);
    return ventas.data;
}

export default async function Ventas(){
    const ventas = await getVentas();
    return (
        <>
            <h1>Ventas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th> {/* Cambiado de Id a # para indicar el índice */}
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Estatus</th>
                        <th>Id Producto</th>
                        <th>Id Usuario</th>
                        <th>Borrar</th>
                        <th>Modificar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ventas.map((venta, index) => (
                            <tr key={venta.id}>
                                <td>{index + 1}</td> {/* Mostrar el índice como número secuencial */}
                                <td>{venta.cantidad}</td>
                                <td>{venta.fecha}</td>
                                <td>{venta.estado}</td>
                                <td>{venta.idProducto1}</td>
                                <td>{venta.idUsuario1}</td>
                                <td><BorrarVenta id={venta.id} /></td>
                                <td>
                                    <Link href={`/ventas/modificar/${venta.id}`} className="btn btn-primary">
                                        Modificar
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="d-flex flex-column justify-content-center align-items-center">
            <Link href={`/ventas/nuevo/`} className="btn btn-primary">
                                        Nuevo
            </Link>
            </div>
        </>
    );
}
