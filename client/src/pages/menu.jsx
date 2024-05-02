import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FaBars, FaProductHunt, FaUsers, FaThLarge, FaGem, FaChartLine, FaSignOutAlt, FaEnvelope } from 'react-icons/fa';
import '../css/menu.css'
// Estilo CSS para tu componente

const Dashboard = () => {
  // Aquí puedes manejar el estado necesario para tu componente
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('dashboard'); // Initial content

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to set active content
  const handleContentChange = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="d-flex align-items-center justify-content-between">
          <a href="/menu" className="logo d-flex align-items-center">
            <img className="logo" src="./LogoSinFondo.png" alt="logo" />
            <span className="nombrelogo">StockWise</span>
          </a>
          <div className="toggle-sidebar-container">
            {/* Wrap the FaBars icon inside the button element */}
            <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
              <FaBars style={{ marginLeft: '5.5px', marginRight: '0px', marginTop: '5px', fontSize: '25px' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <i className="bi bi-grid"></i>
            <span> </span>
          </li>
          <li className="nav-item">
            <i className="bi bi-grid"></i>
            <span> </span>
          </li>
          <li className="nav-item">
            <a className="">
              <i className="bi bi-grid"></i>
              <span> </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <FaProductHunt style={{ marginLeft: '0px', marginRight: '5px', fontSize: '20px' }} />
              <span>Productos</span>
            </a>
          </li>

          <li className="nav-item">
            <a className={activeContent === 'empleados' ? 'nav-link active' : 'nav-link collapsed'} href="#" onClick={() => handleContentChange('empleados')}>
              <FaUsers style={{ marginLeft: '0px', marginRight: '5px', fontSize: '20px' }} />
              <span>Empleados</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="dashboard.html">
              <FaThLarge style={{ marginLeft: '0px', marginRight: '5px', fontSize: '20px' }} />
              <span>Categorias</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="dashboard.html">
              <FaGem style={{ marginLeft: '0px', marginRight: '5px', fontSize: '20px' }} />
              <span>Proveedores</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="dashboard.html">
              <FaChartLine style={{ marginLeft: '0px', marginRight: '5px', fontSize: '20px' }} />
              <span>Ventas</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="dashboard.html">
              <FaGem style={{ marginLeft: '0px', marginRight: '5px', fontSize: '20px' }} />
              <span>Detalle ventas</span>
            </a>
          </li>

          <li className="nav-item-secundary">
            <a className="nav-titulo">
              <span>Pages</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="dashboard.html">
              <FaUsers style={{ marginLeft: '0px', marginRight: '5px', fontSize: '20px' }} />
              <span>Perfil</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="dashboard.html">
              <FaEnvelope style={{ marginLeft: '0px', marginRight: '5px', fontSize: '20px' }} />
              <span>Contactanos</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="dashboard.html">
              <FaSignOutAlt style={{ marginLeft: '0px', marginRight: '5px', fontSize: '20px' }} />
              <span>Salir</span>
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main">
        <div className="pagetitle">
        </div>
        <h1>Dashboard</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/menu">Inicio</a></li>
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
        </nav>
      </main>

    </div>
  );
};

export default Dashboard;
