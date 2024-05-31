import React, { useEffect, useState } from "react";
import { FaUsers, FaDollarSign, FaTrophy, FaUserShield, FaBoxOpen, FaInbox, FaParachuteBox, FaFunnelDollar, FaSearchDollar  } from "react-icons/fa";
import "../css/DashboardCards.css";
import { LinesChart, Pies } from './Charts'
import { useEmpleado } from "../context/empleadoContext";
import { useProducto } from "../context/productoContext";
import { useVenta } from "../context/ventaContext";
import { format } from "date-fns";

const DashboardCards = () => {
  const [stats, setStats] = useState({
    productos: 0,
    empleados: 0,
    totalVentas: 0,
    ventaMayor: null,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

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

      setStats(prevStats => ({
        ...prevStats,
        totalVentas,
        ventaMayor,
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

  const handleCardClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
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
        <FaParachuteBox className="card-icon-2" />

        </div>
        <div className="card-dashboard-2">
          <FaUsers className="card-icon" />
          <div className="card-info">
          <p>Empleados</p>

            <h3>{stats.empleados}</h3>
          </div>
          <FaUserShield className="card-icon-2" />
        </div>
        <div className="card-dashboard-3">
          <FaDollarSign className="card-icon" />
          <div className="card-info">
          <p>Total Ventas</p>

            <h3>${Number(stats.totalVentas).toFixed(2)}</h3>
          </div>
          <FaSearchDollar className="card-icon-2" />
        </div>
        <div className="card-dashboard-detalle" onClick={handleCardClick}>
          <FaTrophy className="card-icon" />
          <div className="card-info">
          <p>Mayor Venta</p>

            <h3>${stats.ventaMayor ? Number(stats.ventaMayor.totalVenta).toFixed(2) : 0}</h3>
          </div>
          <FaFunnelDollar className="card-icon-2" />
        </div>
      </div>
      <div className="card-detalle">
      {isModalVisible && stats.ventaMayor && (
        <div className={`overlay ${isModalVisible ? 'visible' : 'hidden'}`} onClick={handleCloseModal}>
          <div className="detalle-venta-card" onClick={(e) => e.stopPropagation()}>
            <h2>Detalle de la Venta {stats.ventaMayor.idVenta}</h2>
            <p><strong>Total de la Venta: </strong> {stats.ventaMayor.totalVenta}</p>
            <p><strong>Fecha de la Venta: </strong> {format(new Date(stats.ventaMayor.fechaVenta), "dd/MM/yyyy")}</p>
            <h3>Productos:</h3>
            <ul>
              {stats.ventaMayor.detallesVenta && stats.ventaMayor.detallesVenta.length > 0 ? (
                stats.ventaMayor.detallesVenta.map((detalle) => (
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
              <p>Total: {stats.ventaMayor.totalVenta}</p>
            </div>
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
      </div>
      <div className="charts-container">
        <div className="card-dashboard-chart">
          <LinesChart />
        </div>        
        <div className="card-dashboard-chart">
          <Pies />
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
