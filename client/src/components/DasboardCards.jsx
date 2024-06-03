import React, { useEffect, useState } from "react";
import { FaUsers, FaDollarSign, FaTrophy, FaChartPie, FaInbox, FaFunnelDollar, FaChartBar } from "react-icons/fa";
import "../css/DashboardCards.css";
import { LinesChart, Pies } from './Charts';
import { useEmpleado } from "../context/empleadoContext";
import { useProducto } from "../context/productoContext";
import { useVenta } from "../context/ventaContext";
import { format, isToday } from "date-fns";

const DashboardCards = () => {
  const [stats, setStats] = useState({
    productos: 0,
    empleados: 0,
    totalVentas: 0,
    ventaMayor: null,
    ventasHoyCount: 0,
    mayorVentaDia: null,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);

  const { getEmpleado, empleados } = useEmpleado();
  const { getVentas, ventas } = useVenta();
  const { getProducto, productos } = useProducto();

  useEffect(() => {
    const fetchStats = async () => {
      await getEmpleado();
      await getProducto();
      await getVentas();
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (ventas && ventas.length > 0) {
      const totalVentas = ventas.reduce((total, venta) => {
        const valor = parseFloat(venta.totalVenta);
        return total + (isNaN(valor) ? 0 : valor);
      }, 0);

      const ventaMayor = ventas.reduce((max, venta) => {
        const valor = parseFloat(venta.totalVenta);
        return isNaN(valor) ? max : (valor > max.totalVenta ? venta : max);
      }, { totalVenta: 0 });

      const ventasHoy = ventas.filter((venta) => isToday(new Date(venta.fechaVenta)));
      const ventasHoyCount = ventasHoy.length;
      const mayorVentaDia = ventasHoy.reduce((max, venta) => {
        const valor = parseFloat(venta.totalVenta);
        return isNaN(valor) ? max : (valor > max.totalVenta ? venta : max);
      }, { totalVenta: 0 });

      setStats(prevStats => ({
        ...prevStats,
        totalVentas,
        ventaMayor,
        ventasHoyCount,
        mayorVentaDia: ventasHoy.length > 0 ? mayorVentaDia : null,
      }));
    }
  }, [ventas]);

  useEffect(() => {
    if (productos && productos.length > 0) {
      setStats(prevStats => ({
        ...prevStats,
        productos: productos.length,
      }));
    }
  }, [productos]);

  useEffect(() => {
    if (empleados && empleados.length > 0) {
      setStats(prevStats => ({
        ...prevStats,
        empleados: empleados.length,
      }));
    }
  }, [empleados]);

  const getProductoName = (idProducto) => {
    const producto = productos.find((pro) => pro.idProducto === idProducto);
    return producto ? producto.nombProducto : "Desconocido";
  };

  const handleCardClick = (venta) => {
    setSelectedVenta(venta);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedVenta(null);
  };

  return (
    <div className="dashboard-cards">
      <div className="card-container">
        <div className="card-dashboard-1">
          <FaInbox className="card-icon" />
          <div className="card-info">
            <p>Productos</p>
            <h3>{stats.productos}</h3>
          </div>
        </div>
        <div className="card-dashboard-2">
          <FaUsers className="card-icon" />
          <div className="card-info">
            <p>Empleados</p>
            <h3>{stats.empleados}</h3>
          </div>
        </div>
        <div className="card-dashboard-3">
          <FaDollarSign className="card-icon" />
          <div className="card-info">
            <p>Total Ventas</p>
            <h3>${Number(stats.totalVentas).toFixed(2)}</h3>
          </div>
        </div>
        <div className="card-dashboard-detalle" onClick={() => handleCardClick(stats.ventaMayor)}>
          <FaFunnelDollar className="card-icon" />
          <div className="card-info">
            <p>Mayor Venta</p>
            <h3>${stats.ventaMayor ? Number(stats.ventaMayor.totalVenta).toFixed(2) : 0}</h3>
          </div>
        </div>
        <div className="card-dashboard-detalle-1" onClick={() => handleCardClick(stats.mayorVentaDia)}>
          <FaChartPie className="card-icon" />
          <div className="card-info">
            <p>Venta del DIA</p>
            <h3>${stats.mayorVentaDia ? Number(stats.mayorVentaDia.totalVenta).toFixed(2) : 0}</h3>
          </div>
        </div>
        <div className="card-dashboard-detalle-2">
          <FaChartBar className="card-icon" />
          <div className="card-info">
            <p>Ventas del Día</p>
            <h3>{stats.ventasHoyCount}</h3>
          </div>
        </div>
      </div>
      <div className="card-detalle">
        {isModalVisible && selectedVenta && (
          <div className={`overlay ${isModalVisible ? 'visible' : 'hidden'}`} onClick={handleCloseModal}>
            <div className="detalle-venta-card" onClick={(e) => e.stopPropagation()}>
              <h2>Detalle de la Venta {selectedVenta.idVenta}</h2>
              <p><strong>Total de la Venta: </strong> {selectedVenta.totalVenta}</p>
              <p><strong>Fecha de la Venta: </strong> {format(new Date(selectedVenta.fechaVenta), "dd/MM/yyyy")}</p>
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
              <button onClick={handleCloseModal}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
      <div className="charts-container">
        <div className="card-dashboard-chart-1">
          <LinesChart />
        </div>
        <div className="card-dashboard-chart-2">
          <Pies />
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
