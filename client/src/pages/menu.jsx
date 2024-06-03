import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaBars,
  FaHome,
  FaUsers,
  FaThLarge,
  FaCartPlus,
  FaChartLine,
  FaSignOutAlt,
  FaInbox,
  FaChevronUp,
  FaChevronDown,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import logoAzul from "../assets/LogoSinFondo.png";
import "../css/menu.css";
import FormProducto from "../components/FormProducto";
import RegistroEmpleados from "../components/FormEmpleado";
import FormCategoria from "../components/FormCategoria";
import FormProveedor from "../components/FormProveedor";
import FormVenta from "../components/FormVenta";
import FormVentas from "../components/FormVentas";
import DashboardCards from "../components/DasboardCards";
import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isAuthenticated, logout, user, empleado } = useAuth();
  const [activeContent, setActiveContent] = useState("");
  const [ventasSubMenuOpen, setVentasSubMenuOpen] = useState(false);
  const [config, setConfig] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleVentasSubMenu = () => {
    setVentasSubMenuOpen(!ventasSubMenuOpen);
  };

  const toggleUsuarioSubMenu = () => {
    setConfig(!config);
  };

  const renderContent = () => {
    switch (activeContent) {
      case "Inventario":
        return <FormProducto />;
      case "empleados":
        return <RegistroEmpleados />;
      case "categorias":
        return <FormCategoria />;
      case "proveedores":
        return <FormProveedor />;
      case "venta":
        return <FormVenta />;
      case "detalleVentas":
        return <FormVentas />;
      case "Inicio":
        return <DashboardCards />;
      default:
        return <DashboardCards />;
    }
  };
  const userName = user ? user.nombre : empleado ? empleado.nombre : "Desconocido";


  const [theme, setTheme] = useState(() => {
    // Recupera el tema del localStorage o usa 'light' como valor por defecto
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // Guarda el tema en el localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);


  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <a href="/menu" className="logo">
          <img className="logo" src={logoAzul} alt="logo" />
          <span className="nombrelogo">StockWise</span>
        </a>
        <div>
          <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
            <FaBars
              style={{
                marginLeft: "5.5px",
                marginRight: "10px",
                marginTop: "20px",
                fontSize: "25px",
              }}
            />
          </button>
        </div>
        <div className="containerUsuario">
          <div className="usuario" onClick={toggleUsuarioSubMenu} style={{ cursor: "pointer" }}>
            <FaUserCircle style={{ fontSize: "25px", marginLeft: "auto" }} />
            {config ? (
              <FaChevronUp style={{ fontSize: "15px", marginLeft: "auto" }} />
            ) : (
              <FaChevronDown style={{ fontSize: "15px", marginLeft: "auto" }} />
            )}
          </div>
          {config && (
            <div className="sub-menu">
              <div className="sub-menu-item">
                <FaUserCircle style={{ fontSize: "20px" }} />
                <span>{userName}</span>
              </div>
              <div className="sub-menu-item">
                <button className="toggleButton" onClick={toggleTheme}>
                  {theme === "light" ? (
                    <FaMoon style={{ fontSize: "17px", marginLeft: "-17px" }} />
                  ) : (
                    <FaSun style={{ fontSize: "17px", marginLeft: "-17px" }} />
                  )}
                <span>CAMBIAR TEMA</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>


      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link
              className={
                activeContent === "Inicio"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
              onClick={() => setActiveContent("Inicio")}
            >
              <FaHome
                style={{
                  marginLeft: "0px",
                  marginRight: "5px",
                  fontSize: "20px",
                }}
              />
              <span>Inicio</span>
            </Link>
          </li>
          {user && (
            <>
              <li className="nav-item">
                <Link
                  className={
                    activeContent === "Inventario"
                      ? "nav-link active"
                      : "nav-link collapsed"
                  }
                  onClick={() => setActiveContent("Inventario")}
                >
                  <FaInbox
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
                    activeContent === "empleados"
                      ? "nav-link active"
                      : "nav-link collapsed"
                  }
                  onClick={() => setActiveContent("empleados")}
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
                    activeContent === "categorias"
                      ? "nav-link active"
                      : "nav-link collapsed"
                  }
                  onClick={() => setActiveContent("categorias")}
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
                    activeContent === "proveedores"
                      ? "nav-link active"
                      : "nav-link collapsed"
                  }
                  onClick={() => setActiveContent("proveedores")}
                >
                  <FaCartPlus
                    style={{
                      marginLeft: "0px",
                      marginRight: "5px",
                      fontSize: "20px",
                    }}
                  />
                  <span>Proveedores</span>
                </Link>
              </li>
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
