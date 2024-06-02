import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "../css/login.css";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });
  const [error, setError] = useState("");
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Tu cuenta ha sido creada correctamente.",
      });
      setFormData({
        nombre: "",
        correo: "",
        contraseña: "",
      });
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: error.response.data.message,
        footer: error,
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="StockWise"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <label htmlFor="correo">Correo:</label>
            <input
              type="email"
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
              <button type="submit">Registrar Usuario</button>
            </div>
          </form>
          <div className="links">
            <p>¿Ya tienes cuenta?</p>
            <Link to="/login" className="nav-links2">
              Inicia sesión aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
