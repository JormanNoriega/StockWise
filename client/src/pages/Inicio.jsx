import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/inicio.css";
import logoAzul from "../assets/LogoSinFondo.png";

const Inicio = () => {
  const [isQuestion1Open, setIsQuestion1Open] = useState(false);
  const [isQuestion2Open, setIsQuestion2Open] = useState(false);
  const [isQuestion3Open, setIsQuestion3Open] = useState(false);

  const toggleQuestion1 = () => setIsQuestion1Open(!isQuestion1Open);
  const toggleQuestion2 = () => setIsQuestion2Open(!isQuestion2Open);
  const toggleQuestion3 = () => setIsQuestion3Open(!isQuestion3Open);

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
          <h2 className="subtitle">¿Que necesita tener un bien negocio?</h2>
          <p className="about__paragraph">
              Un buen empresario no solo es el que vende mas, si no el que trata y administra
              su negocio como si fuera su vida
          </p>

          <div className="about__main">
            <article className="about__icons">
              <img
                src="./public/images/shapes.svg"
                alt="shapes"
                className="about__icon"
              />
              <h3 className="about__title">Gestionar tu Inventario</h3>
              <p className="about__paragrah">
                Con StockWise obtendras la gestion de tus productos lo mas
                automatizado posible ahorrandote dinero al tener que contratar a otra 
                persona o perdiendo el tiempo con un gestor manual, filtrado de productos, control de stock,
                de categorias, proveedores, etc.
              </p>
            </article>

            <article className="about__icons">
              <img
                src="./public/images/paint.svg"
                alt="paint"
                className="about__icon"
              />
              <h3 className="about__title">Personalizar tu Negocio</h3>
              <p className="about__paragrah">
                  StockWise puede personalizar la vista de interfaz utilizando
                  el cambio de tema a modo oscuro o claro asi las personas que
                  sufren de la vista no se cansaran con la aplicacion
              </p>
            </article>

            <article className="about__icons">
              <img
                src="./public/images/code.svg"
                alt="code"
                className="about__icon"
              />
              <h3 className="about__title">Sass</h3>
              <p className="about__paragrah">
                No se que es Sass
              </p>
            </article>
          </div>
        </section>

        <section className="knowledge">
          <div
            className="knowledge__container contenedor
          "
          >
            <div className="knowledege__texts">
              <h2 className="subtitle">
                Gestor completo de Inventario. ¡Contralo tu stock de manera eficiente y rapida!
              </h2>
              <p className="knowledge__paragraph">
                Todo lo que necesitas a unos pocos clicks,
                reporte de inventarios, generar facturas en pdf,
                reporte de ventas, y mas.
              </p>
              <a href="/login" className="btnComienza">
                Registrate
              </a>
            </div>

            <figure className="knowledge__picture">
              <img
                src="./public/images/macbook.png"
                alt="macbook"
                className="knowledge__img"
              />
            </figure>
          </div>
        </section>

        <section
          className="questions contenedor
        "
        >
          <h2 className="subtitle">Preguntas frecuentes</h2>
          <p className="questions__paragraph">
            ¿No se sabes que es un gestionamiento o un inventario?
          </p>

          <section className="questions__container">
            <article className="questions__padding">
              <div className="questions__answer">
                <h3 className="questions__title" onClick={toggleQuestion1}>
                  ¿Qué es un gestor?
                  <span className="questions__arrow">
                    <img
                      src="./public/images/arrow.svg"
                      alt="arrow"
                      className="questions__img"
                    />
                  </span>
                </h3>

                {isQuestion1Open && (
                  <p className="questions__show">
                    Un gestor es una persona o sistema encargado de administrar y manejar eficientemente determinados recursos, actividades o procesos. Su función principal es gestionar, organizar y realizar las tareas necesarias para el adecuado funcionamiento y consecución de objetivos específicos.
                  </p>
                )}
              </div>
            </article>

            <article className="questions__padding">
              <div className="questions__answer">
                <h3 className="questions__title" onClick={toggleQuestion2}>
                  ¿Gue es un inventario?
                  <span className="questions__arrow">
                    <img
                      src="./public/images/arrow.svg"
                      alt="arrow"
                      className="questions__img"
                    />
                  </span>
                </h3>

                {isQuestion2Open && (
                  <p className="questions__show">
                    Un inventario es un registro documental y detallado de los bienes, mercancías, materiales o productos que posee una empresa, organización o persona en un momento determinado.
                    Es básicamente un listado que especifica las cantidades, características y ubicación de cada artículo almacenado. Los inventarios permiten tener un control sobre la existencia de los productos y facilitan la gestión, planificación y toma de decisiones sobre las operaciones de compra, venta, producción, etc.
                  </p>
                )}
              </div>
            </article>

            <article className="questions__padding">
              <div className="questions__answer">
                <h3 className="questions__title" onClick={toggleQuestion3}>
                  ¿Como puedo utilizar la app?
                  <span className="questions__arrow">
                    <img
                      src="./public/images/arrow.svg"
                      alt="arrow"
                      className="questions__img"
                    />
                  </span>
                </h3>

                {isQuestion3Open && (
                  <p className="questions__show">
                    Para Utilizar la aplicacion te tienes que logear como usuario, ese usuario, que sera el dueño del negocio que se vaya admistrar deberera empezar ingresar la informacion de todo su negocio incluyendo proveedores y debera crear categorias para da uno de sus productos para llevar la gestion mas avanzada, tambien debera
                    ingresar la informacion basica de sus empleados que son los encargados de la informacion y gestion de las ventas del negocio, los reportes son automatizados, solo deberan generarlos atravez de un boton y listo.
                  </p>
                )}
              </div>
            </article>
          </section>

          <section className="questions__offer">
            <h2 className="subtitle">Si quieres utilizar nuestro producto, ¿Que esperas?</h2>
            <p className="questions__copy">
              Si quieres utilizar nuestro producto deberas seguir los pasos que te dejamos
              en las preguntas, si ya sabes manejarlo no esperes mas y registrate.
            </p>
            <a href="/registro" className="btnComienza">
              Registrate ahora
            </a>
          </section>
        </section>
      </main>

      <footer className="footer">
        <section
          className="footer__container contenedor
        "
        >
          <nav className="nav nav--footer">
            <h2 className="footer__title">StockWise - Sistema de Inventario</h2>

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

          <form
            className="footer__form"
            action="https://formspree.io/f/mknkkrkj"
            method="POST"
          >
            <h2 className="footer__newsletter">Envianos un correo</h2>
            <div className="footer__inputs">
              <input
                type="email"
                placeholder="Email:"
                className="footer__input"
                name="_replyto"
              />
              <input
                type="submit"
                value="Registrate"
                className="footer__submit"
              />
            </div>
          </form>
        </section>

        <section
          className="footer__copy contenedor
        "
        >
          <div className="footer__social">
            <a href="#" className="footer__icons">
              <img
                src="./public/images/facebook.svg"
                alt="facebook"
                className="footer__img"
              />
            </a>
            <a href="#" className="footer__icons">
              <img
                src="./public/images/twitter.svg"
                alt="twitter"
                className="footer__img"
              />
            </a>
            <a href="#" className="footer__icons">
              <img
                src="./public/images/youtube.svg"
                alt="youtube"
                className="footer__img"
              />
            </a>
          </div>

          <h3 className="footer__copyright">
            Derechos reservados &copy; StockWise
          </h3>
        </section>
      </footer>
    </div>
  );
};

export default Inicio;
