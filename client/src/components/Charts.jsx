import React, { useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { useVenta } from '../context/ventaContext';
import { useProducto } from '../context/productoContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const defaultFont = {
    family: 'Poppins',
    size: 15,
};

export function LinesChart() {
    const { getVentas, ventas } = useVenta();

    useEffect(() => {
        getVentas();
    },[]);

    const ultimas10Ventas = ventas.slice(-10);
    const labels = ultimas10Ventas.map((venta) => {
        const fecha = new Date(venta.fechaVenta);
        return fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    });

    const dataVentas = ultimas10Ventas.map(venta => venta.totalVenta);

    const lineData = {
        labels: labels,
        datasets: [
            {
                label: 'Últimas 10 Ventas Diarias',
                data: dataVentas,
                tension: 0.5,
                fill: true,
                borderColor: '#5383E8',
                backgroundColor: 'rgba(83, 131, 232, 0.5)',
                pointRadius: 5,
                pointBorderColor: '#5383E8',
                pointBackgroundColor: '#5383E8',
            },
        ],
    };

    const lineOptions = {
        scales: {
            y: {
                min: 0,
                ticks: {
                    font: {
                        ...defaultFont
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        ...defaultFont
                    }
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        ...defaultFont
                    }
                }
            },
            title: {
                display: true,
                text: 'Últimas 10 Ventas Diarias',
                font: {
                    ...defaultFont
                },
                color: defaultFont.color
            }
        }
    };

    return <Line data={lineData} options={lineOptions} />;
}

export function Pies() {
    const { getVentas, ventas } = useVenta();
    const { getProducto, productos } = useProducto();

    useEffect(() => {
        getVentas();
        getProducto();
    }, []);

    // Función para obtener el nombre del producto
    const getProductoName = (idProducto) => {
        const producto = productos.find((pro) => pro.idProducto === idProducto);
        return producto ? producto.nombProducto : "Desconocido";
    };

    // Agrupar ventas por producto
    const ventasPorProducto = ventas.reduce((acc, venta) => {
        venta.detallesVenta.forEach(detalle => {
            if (!acc[detalle.idProducto]) {
                acc[detalle.idProducto] = { cantidad: 0 };
            }
            acc[detalle.idProducto].cantidad += detalle.cantidad;
        });
        return acc;
    }, {});

    // Convertir el objeto a un array y ordenar por cantidad vendida
    const productosOrdenados = Object.entries(ventasPorProducto)
        .map(([idProducto, { cantidad }]) => ({
            idProducto,
            cantidad,
            nombProducto: getProductoName(Number(idProducto))
        }))
        .sort((a, b) => b.cantidad - a.cantidad);

    // Seleccionar los 5 productos más vendidos
    const topProductos = productosOrdenados.slice(0, 5);
    const labels = topProductos.map(p => p.nombProducto);
    const dataProductos = topProductos.map(producto => producto.cantidad);

    const pieData = {
        labels: labels,
        datasets: [
            {
                label: 'Top Productos Más Vendidos',
                data: dataProductos,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)', // Darker Light Blue
                    'rgba(75, 192, 192, 0.5)', // Darker Teal Blue
                    'rgba(33, 150, 243, 0.5)', // Darker Sky Blue
                    'rgba(30, 144, 255, 0.5)', // Darker Dodger Blue
                    'rgba(0, 123, 255, 0.5)', // Darker Classic Blue
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)', // Darker Light Blue
                    'rgba(75, 192, 192, 1)', // Darker Teal Blue
                    'rgba(33, 150, 243, 1)', // Darker Sky Blue
                    'rgba(30, 144, 255, 1)', // Darker Dodger Blue
                    'rgba(0, 123, 255, 1)', // Darker Classic Blue
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    font: {
                        ...defaultFont
                    }
                }
            },
            title: {
                display: true,
                text: 'Top Productos Más Vendidos',
                    font: {
                    ...defaultFont
                },
                color: defaultFont.color
            }
        }
    };

    return <Pie data={pieData} options={pieOptions} />;
}
