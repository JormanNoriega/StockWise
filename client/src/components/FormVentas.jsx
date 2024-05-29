import React, { useEffect, useState } from "react";
import "../css/component.css";
import { useProducto } from "../context/productoContext";
import { useEmpleado } from "../context/empleadoContext";
import { useVenta } from "../context/ventaContext";
import { format } from "date-fns";

const ConsultarVentas = () => {
    const [selectedVenta, setSelectedVenta] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [filterValue, setFilterValue] = useState("");
    const [fechaFin, setFechaFin] = useState(null);
    const { getVentas, ventas } = useVenta();
    const { getProducto, productos } = useProducto();
    const { getEmpleado, empleados } = useEmpleado();
    const [filteredVentas, setFilteredVentas] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        getProducto();
        getEmpleado();
        getVentas();
    }, [selectedVenta]);

    useEffect(() => {
        setFilteredVentas(
            ventas.filter((venta) => {
                if (!fechaInicio || !fechaFin) return true;
                const fechaVenta = new Date(venta.fechaVenta);
                return (
                    fechaVenta >= fechaInicio &&
                    fechaVenta <= fechaFin &&
                    (selectedVenta === null || venta.idVenta === selectedVenta.idVenta) &&
                    (filterValue === "" || getEmpleadoName(venta.idEmpleado).toLowerCase().includes(filterValue.toLowerCase()))
                );
            })
        );
    }, [ventas, filterValue, fechaInicio, fechaFin, selectedVenta]);

    const getProductoName = (idProducto) => {
        const producto = productos.find((pro) => pro.idProducto === idProducto);
        return producto ? producto.nombProducto : "Desconocido";
    };

    const getEmpleadoName = (idEmpleado) => {
        const empleado = empleados.find((e) => e.idEmpleado === idEmpleado);
        return empleado ? empleado.nombre : "Desconocido";
    };

    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
    };

    const handleVentaClick = (venta) => {
        setSelectedVenta(venta);
        setIsVisible(true);
    };

    const handleCloseModal = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsExiting(false);
            setSelectedVenta(null);
        }, 500); // Esperar a que la animación de salida termine antes de ocultar el modal
    };

    const formatFecha = (fecha) => {
        return format(new Date(fecha), "dd/MM/yyyy");
    };

    return (
        <div className="w-full h-full">
            <div className="header-comp">
                <h1 className="title-comp">Consulta de Ventas</h1>
            </div>
            <div className="form-comp">
                <div className="table-card">
                    <h1 className="sub-titles-comp">Ventas Registradas</h1>
                    <div className="search-bar">
                        <input
                            type="date"
                            id="fecha-inicio"
                            name="fecha-inicio"
                            placeholder="Fecha inicio"
                            autoComplete="off"
                            onChange={(e) => setFechaInicio(new Date(e.target.value))}
                        />
                        <input
                            type="text"
                            id="empleado-filter"
                            name="empleado-filter"
                            placeholder="Filtrar empleados"
                            autoComplete="off"
                            value={filterValue}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="date"
                            id="fecha-fin"
                            name="fecha-fin"
                            placeholder="Fecha fin"
                            autoComplete="off"
                            onChange={(e) => setFechaFin(new Date(e.target.value))}
                        />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID venta</th>
                                <th>Empleado</th>
                                <th>Total de la venta</th>
                                <th>Fecha de la venta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVentas.map((venta) => (
                                <tr key={venta.idVenta} onClick={() => handleVentaClick(venta)}>
                                    <td>{venta.idVenta}</td>
                                    <td>{getEmpleadoName(venta.idEmpleado)}</td>
                                    <td>{venta.totalVenta}</td>
                                    <td>{formatFecha(venta.fechaVenta)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {selectedVenta && (
                    <div className={`overlay ${isExiting ? 'hidden' : 'visible'}`} onClick={handleCloseModal}>
                        <div className={`detalle-venta-card ${isExiting ? 'exiting' : ''}`} onClick={(e) => e.stopPropagation()}>
                            <h2>Detalle de la Venta {selectedVenta.idVenta}</h2>
                            <p><strong>Total de la Venta: </strong> {selectedVenta.totalVenta}</p>
                            <p><strong>Fecha de la Venta: </strong> {formatFecha(selectedVenta.fechaVenta)}</p>
                            <h3>Productos:</h3>
                            <ul>
                                {selectedVenta.detalleVentas && selectedVenta.detalleVentas.length > 0 ? (
                                    selectedVenta.detalleVentas.map((detalle) => (
                                        <li key={detalle.idDetalleVenta}>
                                            <p><strong>Producto: </strong> {getProductoName(detalle.idProducto)}</p>
                                            <p><strong>Cantidad: </strong> {detalle.cantidad}</p>
                                            <p><strong>Sub Total: </strong> {detalle.subTotal}</p>
                                        </li>
                                    ))
                                ) : (
                                    <p>No hay detalles disponibles para esta venta.</p>
                                )}
                            </ul>
                            <div className="total">
                                <p>Total: {selectedVenta.totalVenta}</p>
                            </div>
                            <button onClick={handleCloseModal}>Cerrar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultarVentas;
