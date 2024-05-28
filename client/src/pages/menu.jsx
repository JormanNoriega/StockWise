import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaProductHunt,
  FaUsers,
  FaThLarge,
  FaGem,
  FaChartLine,
  FaSignOutAlt,
  FaEnvelope,
  FaChevronUp,
  FaChevronDown,
  FaClipboardList,
  FaFileInvoiceDollar
} from "react-icons/fa";
import "../css/menu.css";
import FormProducto from "../components/FormProducto";
import RegistroEmpleados from "../components/FormEmpleado";
import FormCategoria from "../components/FormCategoria";
import FormProveedor from "../components/FormProveedor";
import FormVenta from "../components/FormVenta";
import FormVentas from "../components/FormVentas";
import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isAuthenticated, logout, user, empleado } = useAuth();
  const [activeContent, setActiveContent] = useState("");
  const [ventasSubMenuOpen, setVentasSubMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleVentasSubMenu = () => {
    setVentasSubMenuOpen(!ventasSubMenuOpen);
  };

  const renderContent = () => {
    switch (activeContent) {
      case "producto":
        return <FormProducto />;
      case "empleado":
        return <RegistroEmpleados />;
      case "categoria":
        return <FormCategoria />;
      case "proveedor":
        return <FormProveedor />;
      case "venta":
        return <FormVenta />;
        case "detalleVentas":
          return <FormVentas />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <a href="/menu" className="logo">
          <img className="logo" src="./LogoSinFondo.png" alt="logo" />
          <span className="nombrelogo">StockWise</span>
        </a>
        <div>
          <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
            <FaBars
              style={{
                marginLeft: "5.5px",
                marginRight: "0px",
                marginTop: "5px",
                fontSize: "25px",
              }}
            />
          </button>
        </div>
      </header>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-nav" id="sidebar-nav">
          {user && (
            <>
              <li className="nav-item">
                <Link
                  className={
                    activeContent === "producto"
                      ? "nav-link active"
                      : "nav-link collapsed"
                  }
                  onClick={() => setActiveContent("producto")}
                >
                  <FaProductHunt
                    style={{
                      marginLeft: "0px",
                      marginRight: "5px",
                      fontSize: "20px",
                    }}
                  />
                  <span>Productos</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={
                    activeContent === "empleado"
                      ? "nav-link active"
                      : "nav-link collapsed"
                  }
                  onClick={() => setActiveContent("empleado")}
                >
                  <FaUsers
                    style={{
                      marginLeft: "0px",
                      marginRight: "5px",
                      fontSize: "20px",
                    }}
                  />
                  <span>Empleados</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={
                    activeContent === "categoria"
                      ? "nav-link active"
                      : "nav-link collapsed"
                  }
                  onClick={() => setActiveContent("categoria")}
                >
                  <FaThLarge
                    style={{
                      marginLeft: "0px",
                      marginRight: "5px",
                      fontSize: "20px",
                    }}
                  />
                  <span>Categorias</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={
                    activeContent === "proveedor"
                      ? "nav-link active"
                      : "nav-link collapsed"
                  }
                  onClick={() => setActiveContent("proveedor")}
                >
                  <FaGem
                    style={{
                      marginLeft: "0px",
                      marginRight: "5px",
                      fontSize: "20px",
                    }}
                  />
                  <span>Proveedores</span>
                </Link>
              </li>
            </>
          )}

          {empleado && (
            <>
              <li className="nav-item">
                <div
                  className={
                    activeContent.startsWith("venta")
                      ? "nav-link active"
                      : "nav-link collapsed"
                  }
                  onClick={toggleVentasSubMenu}
                  style={{ cursor: "pointer" }}
                >
                  <FaChartLine
                    style={{
                      marginLeft: "0px",
                      marginRight: "5px",
                      fontSize: "20px",
                    }}
                  />
                  <span>Ventas</span>
                  {ventasSubMenuOpen ? (
                    <FaChevronUp style={{ marginLeft: "auto" }} />
                  ) : (
                    <FaChevronDown style={{ marginLeft: "auto" }} />
                  )}
                </div>
                {ventasSubMenuOpen && (
                  <ul className="submenu">
                    <li className="nav-item">
                      <Link
                        className={
                          activeContent === "venta"
                            ? "nav-link active"
                            : "nav-link collapsed"
                        }
                        onClick={() => setActiveContent("venta")}
                      >
                        <FaClipboardList
                          style={{
                            marginLeft: "0px",
                            marginRight: "5px",
                            fontSize: "20px",
                          }}
                        />
                        <span>Generar venta</span>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={
                          activeContent === "detalleVentas"
                            ? "nav-link active"
                            : "nav-link collapsed"
                        }
                        onClick={() => setActiveContent("detalleVentas")}
                      >
                        <FaFileInvoiceDollar
                          style={{
                            marginLeft: "0px",
                            marginRight: "5px",
                            fontSize: "20px",
                          }}
                        />
                        <span>Detalle de Ventas</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </>
          )}
          <li className="nav-item-secundary">
            <a className="nav-titulo">
              <span>Pages</span>
            </a>
          </li>

          <li className="nav-item">
            <Link
              className={
                activeContent === "perfil"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
              onClick={() => setActiveContent("perfil")}
            >
              <FaUsers
                style={{
                  marginLeft: "0px",
                  marginRight: "5px",
                  fontSize: "20px",
                }}
              />
              <span>Perfil</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={
                activeContent === "contacto"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
              onClick={() => setActiveContent("contacto")}
            >
              <FaEnvelope
                style={{
                  marginLeft: "0px",
                  marginRight: "5px",
                  fontSize: "20px",
                }}
              />
              <span>Contactanos</span>
            </Link>
          </li>

          <li className="nav-item">
            {isAuthenticated ? (
              <Link
                to="/login"
                className="nav-link collapsed"
                onClick={() => {
                  logout();
                }}
              >
                <FaSignOutAlt
                  style={{
                    marginLeft: "0px",
                    marginRight: "5px",
                    fontSize: "20px",
                  }}
                />
                <span>Salir</span>
              </Link>
            ) : (
              <></>
            )}
          </li>
        </ul>
      </aside>

      <main className={`main ${sidebarOpen ? "" : "full"}`}>
        <div className="pagetitle" />
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
