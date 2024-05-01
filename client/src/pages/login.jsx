import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginContrasena, setLoginContrasena] = useState("");

  return (
    <div className="Bg-Img">
      <div className="container">
        <div className="info">
          <img src="../LogoSinFondo.png" alt="" />
          <h1 className="hero-titulo">StockWise</h1>
          <link
            href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
            rel="stylesheet"
          ></link>
          <p>
            Descubre cómo puedes optimizar y mejorar la gestión de tu negocio
            con nuestras soluciones especializadas. ¡Únete a nosotros para
            llevar tu negocio al siguiente nivel! :D
          </p>
        </div>
        <div className="login-form">
          <h2>Inicio De Sesíon</h2>
          <form action="#">
            <label htmlFor="username">Tipo de Inicio de Sesíon:</label>
            <select name="tipo" id="tipo">
              <option value="user">Usuario</option>
              <option value="employee">Empleado</option>
            </select>
            <label htmlFor="username">Correo:</label>
            <input
              type="text"
              id="username"
              name="username"
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
              <button type="submit">Inicia Sesíon</button>
            </div>
            <a>¿No tienes cuenta?</a> <b />
            <Link to="/registro" className="nav-links2">
              Registrate aqui
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
