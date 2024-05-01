import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/registro.css";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginContrasena, setLoginContrasena] = useState("");

  return (
    <div className="Bg-Img">
      <div className="container">
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
        <div className="info">
          <img src="../LogoSinFondo.png" alt="" />
          <h1 className="hero-titulo">StockWise</h1>
          <p>
            Descubre cómo puedes optimizar y mejorar la gestión de tu negocio
            con nuestras soluciones especializadas. ¡Únete a nosotros para
            llevar tu negocio al siguiente nivel! :D
          </p>
        </div>
        <div className="login-form">
          <h2>Crear Usuario</h2>
          <form>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="StockWise"
              required
            />
            <label htmlFor="username">Correo:</label>
            <input
              type="text"
              id="username"
              name="correo"
              placeholder="usuario@ejemplo.com"
              required
            />
            <label htmlFor="password">Contraseña:</label>
            <div className="toggle-password">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="*************"
                value={loginContrasena}
                onChange={(event) => {
                  setLoginContrasena(event.target.value);
                }}
                required
              />
              <i
                className={showPassword ? "bx bx-hide" : "bx bx-show"}
                onClick={() => setShowPassword(!showPassword)}
                id="toggleBtn"
              ></i>
            </div>
            <div className="btns">
              <button type="button">Registrar Usuario</button>
            </div>
            <a>¿Tienes cuenta ya?</a> <b />
            <Link to="/login" className="nav-links2">
              Inicia sesión aquí
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
