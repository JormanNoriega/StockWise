import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import "../css/component.css";
import { useProducto } from "../context/productoContext";
import { useEmpleado } from "../context/empleadoContext";
import { useAuth } from "../context/authContext";
import { useVenta } from "../context/ventaContext";
import { format, startOfDay, endOfDay } from "date-fns";
import logoAzul from "../assets/LogoSinFondo.png";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Chart from 'chart.js/auto';

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
    const { user, empleado } = useAuth();
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        getProducto();
        getEmpleado();
        getVentas();
    }, []);

    useEffect(() => {
        setFilteredVentas(
            ventas.filter((venta) => {
                const fechaVenta = new Date(venta.fechaVenta);
                const isWithinDateRange = (!fechaInicio || fechaVenta >= startOfDay(fechaInicio)) && (!fechaFin || fechaVenta <= endOfDay(fechaFin));
                const matchesEmpleadoFilter = filterValue === "" || getEmpleadoName(venta.idEmpleado).toLowerCase().includes(filterValue.toLowerCase());

                return isWithinDateRange && matchesEmpleadoFilter;
            })
        );
    }, [ventas, filterValue, fechaInicio, fechaFin]);

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
        }, 500);
    };

    const formatFecha = (fecha) => {
        return format(new Date(fecha), "dd/MM/yyyy");
    };
    const userName = user ? user.nombre : empleado ? empleado.nombre : "Desconocido";

    const generateVentasPDF = () => {
        const doc = new jsPDF();

        const ventasPorFecha = ventas.reduce((acc, venta) => {
            const fecha = new Date(venta.fechaVenta).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
            if (!acc[fecha]) {
                acc[fecha] = 0;
            }
            acc[fecha] += parseFloat(venta.totalVenta);
            return acc;
        }, {});
    
        const fechasOrdenadas = Object.keys(ventasPorFecha)
            .sort((a, b) => {
                const [dayA, monthA, yearA] = a.split('/');
                const [dayB, monthB, yearB] = b.split('/');
                return new Date(`${yearA}-${monthA}-${dayA}`) - new Date(`${yearB}-${monthB}-${dayB}`);
            });
    
        const labelsVentas = fechasOrdenadas;
        const dataVentas = fechasOrdenadas.map(fecha => ventasPorFecha[fecha]);

        const ventasPorProducto = ventas.reduce((acc, venta) => {
            venta.detallesVenta.forEach(detalle => {
                if (!acc[detalle.idProducto]) {
                    acc[detalle.idProducto] = { cantidad: 0 };
                }
                acc[detalle.idProducto].cantidad += detalle.cantidad;
            });
            return acc;
        }, {});
    
        const productosOrdenados = Object.entries(ventasPorProducto)
            .map(([idProducto, { cantidad }]) => ({
                idProducto,
                cantidad,
                nombProducto: getProductoName(Number(idProducto))
            }))
            .sort((a, b) => b.cantidad - a.cantidad);
    
        const topProductos = productosOrdenados.slice(0, 5);
        const labels = topProductos.map(p => p.nombProducto);
        const dataProductos = topProductos.map(producto => producto.cantidad);


        const chartData = {
            labels: labelsVentas,
            datasets: [{
                label: 'Últimas Ventas Diarias',
                data: dataVentas,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }],
        };

        const chartData2 = {
            labels: labels.map(label => label.length > 6 ? label.substring(0, 6) + '...' : label),
            datasets: [{
                label: 'Top Productos',
                data: dataProductos,
                backgroundColor: [
                    'rgba(30, 144, 255, 0.7)', // Dodger Blue
                    'rgba(0, 119, 182, 0.7)', // Dark Cerulean
                    'rgba(0, 87, 132, 0.7)',  // Indigo Dye
                    'rgba(18, 52, 86, 0.7)',  // Dark Blue
                    'rgba(0, 48, 73, 0.7)',   // Prussian Blue
                ],
                borderColor: [
                    'rgba(30, 144, 255, 1)', // Dodger Blue
                    'rgba(0, 119, 182, 1)', // Dark Cerulean
                    'rgba(0, 87, 132, 1)',  // Indigo Dye
                    'rgba(18, 52, 86, 1)',  // Dark Blue
                    'rgba(0, 48, 73, 1)',   // Prussian Blue
                ],
                borderWidth: 2,
                borderRadius: 5, // Añade bordes redondeados a las barras
                hoverBackgroundColor: [
                    'rgba(30, 144, 255, 0.9)', // Versiones más oscuras para hover
                    'rgba(0, 119, 182, 0.9)',
                    'rgba(0, 87, 132, 0.9)',
                    'rgba(18, 52, 86, 0.9)',
                    'rgba(0, 48, 73, 0.9)',
                ],
            }],
        };

        const canvas = document.createElement('canvas');
        canvas.style.display = 'none';
        document.body.appendChild(canvas);
        
        const canvas2 = document.createElement('canvas');
        canvas2.style.display = 'none';
        document.body.appendChild(canvas2);
        
        const scaleFactor = 4;
        canvas.width = 130 * scaleFactor;
        canvas.height = 60 * scaleFactor;
        
        const ctx = canvas.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                animation: false,
                responsive: false,
                maintainAspectRatio: false,
                devicePixelRatio: scaleFactor,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        });

        const scaleFactor2 = 4;
        canvas2.width = 120 * scaleFactor2;
        canvas2.height = 60 * scaleFactor2;

        const ctx2 = canvas2.getContext('2d');
        const myChart2 = new Chart(ctx2, {
            type: 'pie',
            data: chartData2,
            options: {
                animation: false,
                responsive: false,
                maintainAspectRatio: false,
                devicePixelRatio: scaleFactor,

            },
        });
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(12);
        doc.text("GRAFICO DE VENTAS", 76, 65);
        doc.addImage(myChart.toBase64Image(), 'PNG', 50, 75, 100, 50); 
        doc.addImage(myChart2.toBase64Image(), 'PNG', 50, 135, 100, 60); 
        doc.addImage(logoAzul, 'PNG', 5, 5, 25, 25);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.text("REPORTE DE VENTAS", 75, 20);
        doc.text("Reportes", 153, 25);
        doc.text("Ventas", 155, 30);
        doc.setFontSize(10);
        doc.setLineWidth(0.5);
        doc.line(15, 35, 195, 35);
        doc.text("Generado por: " + userName, 100, 40);
        doc.text("StockWise", 15, 40);
        doc.text("Aplicación de Gestión de Inventario", 15, 45);
        doc.text("Generado el: " + format(new Date(), "dd/MM/yyyy"), 15, 50);
        doc.setLineWidth(0.5);
        doc.line(15, 55, 195, 55);
        doc.setFontSize(12);
        doc.text("TABLA DE VENTAS", 77, 200);
        doc.autoTable({
            startY: 205,
            headStyles: {
                fontStyle: 'bold',
                fontSize: 10
            },
            bodyStyles: {
                fontSize: 9
            },
            head: [['ID Venta', 'Empleado', 'Total de la Venta', 'Fecha de la Venta']],
            body: filteredVentas.map(venta => [
                venta.idVenta,
                getEmpleadoName(venta.idEmpleado),
                venta.totalVenta,
                formatFecha(venta.fechaVenta)
            ])
        });
        doc.save("Reporte" + format(new Date(), "ddMMyyyy") + ".pdf");
        myChart.destroy();
        myChart2.destroy();
        document.body.removeChild(canvas);
        document.body.removeChild(canvas2);
    };

    const generateDetallePDF = () => {
        if (!selectedVenta) return;

        const doc = new jsPDF();
        doc.addImage(logoAzul, 'PNG', 5, 5, 25, 25);
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(14);
        doc.text("FACTURA DE LA VENTA", 70, 20);
        doc.text("Reportes", 156, 25);
        doc.text(`Factura ${selectedVenta.idVenta}`, 155, 30);
        doc.setFontSize(10);
        doc.setLineWidth(0.5);
        doc.line(15, 35, 195, 35);
        doc.text("Generado por: " + userName, 100, 40);
        doc.text("StockWise", 15, 40);
        doc.text("Aplicación de Gestión de Inventario", 15, 45);
        doc.text("Generado el: " + format(new Date(), "dd/MM/yyyy"), 15, 50);
        doc.setLineWidth(0.5);
        doc.line(15, 55, 195, 55);
        doc.autoTable({
            startY: 60,
            headStyles: {
                fontStyle: 'bold',
                fontSize: 10
            },
            bodyStyles: {
                fontSize: 9
            },
            head: [['Producto', 'Cantidad', 'Sub Total']],
            body: selectedVenta.detallesVenta.map(detalle => [
                getProductoName(detalle.idProducto),
                detalle.cantidad,
                detalle.subTotal
            ])
        });
        doc.text(`Total: ${selectedVenta.totalVenta}`, 14, doc.autoTable.previous.finalY + 10);
        doc.save(`Factura${selectedVenta.idVenta}.pdf`);
    };

    return (
        <div className="w-full h-full">
            <div className="header-comp">
                <h1 className="title-comp">Consulta de Ventas</h1>
            </div>
            <div className="form-comp">
                <div className="table-card">
                    <h1 className="sub-titles-copm">Ventas Registradas</h1>
                    <div className="search-bar">
                        <input
                            type="date"
                            id="fecha-inicio"
                            name="fecha-inicio"
                            placeholder="Fecha inicio"
                            autoComplete="off"
                            onChange={(e) => setFechaInicio(e.target.value ? new Date(e.target.value) : null)}
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
                            onChange={(e) => setFechaFin(e.target.value ? new Date(e.target.value) : null)}
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
                    <div className="print-button-container">
                        <button
                            onClick={generateVentasPDF}>
                            <FaFilePdf
                                style={{
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                    marginTop: "10px",
                                    marginBottom: "5px",
                                    fontSize: "20px",
                                }}
                            />
                        </button>
                    </div>
                    {selectedVenta && (
                        <div className={`overlay ${isExiting ? 'hidden' : 'visible'}`} onClick={handleCloseModal}>
                            <div className={`detalle-venta-card ${isExiting ? 'exiting' : ''}`} onClick={(e) => e.stopPropagation()}>
                                <h2>Detalle de la Venta {selectedVenta.idVenta}</h2>
                                <p><strong>Total de la Venta: </strong> {selectedVenta.totalVenta}</p>
                                <p><strong>Fecha de la Venta: </strong> {formatFecha(selectedVenta.fechaVenta)}</p>
                                <h3>Productos:</h3>
                                <ul>
                                    {selectedVenta.detallesVenta && selectedVenta.detallesVenta.length > 0 ? (
                                        selectedVenta.detallesVenta.map((detalle) => (
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
                                <div className="report-button-card" >
                                    <button className="report-button" onClick={generateDetallePDF}>Generar PDF de la factura</button>
                                </div>
                                <div className="cerrar-button-card">
                                    <button className="cerrar-button" onClick={handleCloseModal}>Cerrar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConsultarVentas;
