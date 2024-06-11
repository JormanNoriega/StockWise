import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/inicio.css";
import logoAzul from "../assets/LogoSinFondo.png";
import { FaCoins, FaBoxes } from "react-icons/fa";
import { BiSolidTachometer } from "react-icons/bi";

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <article
    className={`questions__padding ${isOpen ? "questions__padding--add" : ""}`}
  >
    <div className="questions__title" onClick={onClick}>
      {question}
      <span
        className={`questions__arrow ${
          isOpen ? "questions__arrow--rotate" : ""
        }`}
      >
        <img
          src="./public/images/arrow.svg"
          alt="arrow"
          className="questions__img"
        />
      </span>
    </div>
    <div
      className={`questions__show ${isOpen ? "questions__show--visible" : ""}`}
    >
      <p className="questions__answer">{answer}</p>
    </div>
  </article>
);

const Inicio = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (questionIndex) => {
    setOpenQuestion(openQuestion === questionIndex ? null : questionIndex);
  };

  const faqData = [
    {
      question: "¿Qué es un gestor?",
      answer:
        "Un gestor es un sistema encargado de administrar y manejar eficientemente determinados recursos, actividades o procesos. Su función principal es gestionar, organizar y ejecutar las tareas necesarias para el adecuado funcionamiento y la consecución de objetivos específicos.",
    },
    {
      question: "¿Qué es un inventario?",
      answer:
        "Un inventario es un registro documental y detallado de los bienes, mercancías, materiales o productos que posee una empresa, organización o persona en un momento determinado. Es básicamente un listado que especifica las cantidades, características y ubicación de cada artículo almacenado. Los inventarios permiten tener un control sobre la existencia de los productos y facilitan la gestión, planificación y toma de decisiones sobre las operaciones de compra, venta, producción, etc.",
    },
    {
      question: "¿Cómo puedo utilizar la Web?",
      answer:
        "Para utilizar esta plataforma, inicia sesión como usuario administrador del negocio. Ingresa toda la información de tu negocio, incluyendo proveedores, y crea categorías para tus productos. Añade la información básica de tus empleados encargados de la gestión de ventas. Los reportes se generan automáticamente con solo pulsar un botón.",
    },
  ];

  return (
    <div className="App">
      <header className="hero">
        <nav className="nav contenedor">
          <div className="nav-logo">
            <img src={logoAzul} alt="logo" />
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

      <main>
        <section className="contenedor about">
          <h2 className="subtitle">¿Qué necesita tener un bien negocio?</h2>
          <p className="about__paragraph">
            Organización precisa, gestión eficiente y resultados excepcionales
            para alcanzar el éxito.
          </p>

          <div className="about__main">
            <article className="about__icons">
              <FaBoxes
                style={{
                  color: "var(--azul1)",
                  fontSize: "45px",
                }}
              />
              <h3 className="about__title">Gestiona tu Inventario</h3>
              <p className="about__paragrah">
                Mantén un control preciso y actualizado de tus productos,
                categorías y proveedores, garantizando una gestión eficaz y sin
                errores.
              </p>
            </article>

            <article className="about__icons">
              <BiSolidTachometer
                style={{
                  color: "var(--azul1)",
                  fontSize: "45px",
                }}
              />
              <h3 className="about__title">Optimiza Tus Recursos</h3>
              <p className="about__paragrah">
                Maximiza la eficiencia de tu negocio automatizando procesos
                clave, ahorrando tiempo y reduciendo costos operativos.
              </p>
            </article>

            <article className="about__icons">
              <FaCoins
                style={{
                  color: "var(--azul1)",
                  fontSize: "45px",
                }}
              />
              <h3 className="about__title">Gestiona Tus Ingresos</h3>
              <p className="about__paragrah">
                Supervisa y analiza tus ventas con reportes automatizados,
                permitiéndote tomar decisiones informadas y aumentar tus
                beneficios.
              </p>
            </article>
          </div>
        </section>

        <section className="knowledge">
          <div className="knowledge__container contenedor">
            <div className="knowledege__texts">
              <h2 className="subtitle">
                Gestor completo de Inventario. ¡Controla tu stock de manera
                eficiente y rápida!
              </h2>
              <p className="knowledge__paragraph">
                Todo lo que necesitas a unos pocos clicks: reporte de
                inventarios, generar facturas en PDF, reporte de ventas, y más.
              </p>
              <a href="/login" className="btnComienza">
                Regístrate
              </a>
            </div>

            <figure className="knowledge__picture">
              <img
                src="./public/images/MacbookSinFondo.png"
                alt="macbook"
                className="knowledge__img"
              />
            </figure>
          </div>
        </section>

        <section className="questions contenedor">
          <h2 className="subtitle">Preguntas frecuentes</h2>
          <p className="questions__paragraph">
            ¿No sabes qué es un gestionamiento o un inventario?
          </p>

          <section className="questions__container">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openQuestion === index}
                onClick={() => toggleQuestion(index)}
              />
            ))}
          </section>

          <section className="questions__offer">
            <h2 className="subtitle">
              Si quieres utilizar nuestro producto, ¿Qué esperas?
            </h2>
            <p className="questions__copy">
              Si quieres utilizar nuestro producto deberás seguir los pasos que
              te dejamos en las preguntas. Si ya sabes manejarlo, no esperes más
              y regístrate.
            </p>
            <a href="/registro" className="btnComienza">
              Regístrate ahora
            </a>
          </section>
        </section>
      </main>

      <footer className="footer">
        <section className="footer__container contenedor">
          <h2 className="footer__title">StockWise - Sistema de Inventario</h2>
          <nav className="nav nav--footer">
            <ul className="nav__link nav__link--footer">
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
            <form
              className="footer__form"
              action="https://formspree.io/f/mknkkrkj"
              method="POST"
            >
              <div className="footer__inputs">
                <input
                  type="email"
                  className="footer__input"
                  placeholder="Email"
                  required
                />
                <button type="submit" className="footer__submit">
                  Regístrate
                </button>
              </div>
            </form>
          </nav>
        </section>
        <div className="footer__copy">
          <div className="footer__icons">
            <a href="#">
              <img
                src="./public/images/facebook.svg"
                alt="icon"
                className="footer__img"
              />
            </a>
            <a href="#">
              <img
                src="./public/images/twitter.svg"
                alt="icon"
                className="footer__img"
              />
            </a>
            <a href="#">
              <img
                src="./public/images/youtube.svg"
                alt="icon"
                className="footer__img"
              />
            </a>
          </div>
          <p className="footer__copyright">Derechos reservados © StockWise</p>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;
