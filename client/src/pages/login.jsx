import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";
import logoAzul from "/assets/LogoSinFondo.png";
import Swal from "sweetalert2";
import { useAuth } from "../context/authContext";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tipo: "user",
    correo: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { signin, signine } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formData.tipo === "user") {
        await signin(formData);
      } else if (formData.tipo === "employee") {
        await signine(formData);
      }
      Swal.fire({
        icon: "success",
        title: "¡Inicio de sesión exitoso!",
        text: "¡Bienvenido de vuelta!",
      });
      navigate("/menu");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Correo o contraseña incorrectos",
        footer: error.message,
      });
    }
  };

  return (
    <div className="Bg-Img">
      <div className="container">
        <div className="info">
          <img src={logoAzul} alt="" />
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
          <h2>Inicio De Sesión</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="tipo">Tipo de Inicio de Sesión:</label>
            <select
              name="tipo"
              id="tipo"
              value={formData.tipo}
              onChange={handleChange}
            >
              <option value="user">Usuario</option>
              <option value="employee">Empleado</option>
            </select>
            <label htmlFor="correo">Correo:</label>
            <input
              type="text"
              id="correo"
              name="correo"
              placeholder="usuario@ejemplo.com"
              value={formData.correo}
              onChange={handleChange}
              required
            />
            <label htmlFor="contraseña">Contraseña:</label>
            <div className="toggle-password">
              <input
                type={showPassword ? "text" : "password"}
                id="contraseña"
                name="contraseña"
                placeholder="*************"
                value={formData.contraseña}
                onChange={handleChange}
                required
              />
              <i
                className={showPassword ? "bx bx-hide" : "bx bx-show"}
                onClick={() => setShowPassword(!showPassword)}
                id="toggleBtn"
              ></i>
            </div>
            <div className="btns">
              <button type="submit">Inicia Sesión</button>
            </div>
          </form>
          <div className="links">
            <p>¿No tienes cuenta?</p>
            <Link to="/registro" className="nav-links2">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
