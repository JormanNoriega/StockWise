import React from "react";
import { Link } from "react-router-dom";
import "../css/inicio.css";

const Inicio = () => {
  return (
    <div className="App">
      <header className="hero">
        <nav className="nav contenedor">
          <div className="nav-logo">
            <img src="./LogoSinFondoBlanco.png" alt="logo" />
            <h2 className="nav-titulo">StockWise</h2>
          </div>
          <ul className="nav-link">
            <li className="nav-items">
              <Link to="/login" className="nav-links">
                Iniciar Sesión
              </Link>
            </li>
            <li className="nav-items">
              <Link to="/registro" className="nav-links">
                Registrarse
              </Link>
            </li>
          </ul>
        </nav>
        <section className="hero-contenedor contenedor">
          <h1 className="hero-titulo">StockWise</h1>
          <p className="hero-parrafo">
            Elige administrar tu negocio de la manera más eficiente con nosotros
            :D
          </p>
          <Link to="/registro" className="btnComienza">
            Comienza ahora
          </Link>
        </section>
      </header>
    </div>
  );
};

export default Inicio;
