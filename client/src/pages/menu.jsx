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
} from "react-icons/fa";
import "../css/menu.css";
import FormProducto from "../components/FormProducto";
import FormEmpleado from "../components/FormEmpleado";
import FormCategoria from "../components/FormCategoria";
import FormProveedor from "../components/FormProveedor";
import FormVenta from "../components/FormVenta";

import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [activeContent, setActiveContent] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard">
      {/* BARRA SUPERIOR*/}
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

      {/* BARRA DE NAVEGACION LATERAL*/}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a
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
            </a>
          </li>

          <li className="nav-item">
            <a
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
            </a>
          </li>

          <li className="nav-item">
            <a
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
            </a>
          </li>

          <li className="nav-item">
            <a
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
            </a>
          </li>

          <li className="nav-item">
            <a
              className={
                activeContent === "venta"
                  ? "nav-link active"
                  : "nav-link collapsed"
              }
              onClick={() => setActiveContent("venta")}
            >
              <FaChartLine
                style={{
                  marginLeft: "0px",
                  marginRight: "5px",
                  fontSize: "20px",
                }}
              />
              <span>Ventas</span>
            </a>
          </li>

          <li className="nav-item-secundary">
            <a className="nav-titulo">
              <span>Pages</span>
            </a>
          </li>

          <li className="nav-item">
            <a
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
            </a>
          </li>

          <li className="nav-item">
            <a
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
            </a>
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

      {/*Contenido Principal*/}
      <main className="main">
        <div className="pagetitle" />
        {activeContent === "producto" && <FormProducto />}
        {activeContent === "empleado" && <FormEmpleado />}
        {activeContent === "categoria" && <FormCategoria />}
        {activeContent === "proveedor" && <FormProveedor />}
        {activeContent === "ventas" && <FormVenta />}
      </main>
    </div>
  );
};

export default Dashboard;
