import React from "react";
import { Link } from "react-router-dom";
import "../css/inicio.css";
import logoAzul from "../assets/LogoSinFondo.png";

const Inicio = () => {
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
          <h2 className="subtitle">¿Qué aprenderás en este curso?</h2>
          <p className="about__paragraph">
            Todo lo necesario y obligatorio de CSS, (Flexbox, Grid, Custom
            properties, Position, Animaciones, Box Model y más)
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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
                tempore porro eius facilis?
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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
                tempore porro eius facilis?
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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
                tempore porro eius facilis?
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
                Curso completo de CSS3. ¡Domina CSS de una vez por todas!
              </h2>
              <p className="knowledge__paragraph">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Excepturi, aliquam nemo in facere suscipit at delectus unde
                labore ad officia iste accusantium eaque aperiam laborum est
                voluptate totam? Modi, obcaecati?
              </p>
              <a href="/login" className="btnComienza">
                Entra al curso
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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, porro
            doloribus neque perspiciatis sapiente fuga.
          </p>

          <section className="questions__container">
            <article className="questions__padding">
              <div className="questions__answer">
                <h3 className="questions__title">
                  ¿Qué es CSS?
                  <span className="questions__arrow">
                    <img
                      src="./public/images/arrow.svg"
                      alt="arrow"
                      className="questions__img"
                    />
                  </span>
                </h3>

                <p className="questions__show">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
                  facere, quidem eum id excepturi assumenda explicabo nam
                  accusamus veritatis voluptates eveniet adipisci, dicta nihil
                  nemo modi possimus officiis quam atque? Lorem ipsum, dolor sit
                  amet consectetur adipisicing elit. Quos facere, quidem eum id
                  excepturi assumenda explicabo nam accusamus veritatis
                  voluptates eveniet adipisci, dicta nihil nemo modi possimus
                  officiis quam atque?
                </p>
              </div>
            </article>

            <article className="questions__padding">
              <div className="questions__answer">
                <h3 className="questions__title">
                  ¿Qué aprenderé en este curso?
                  <span className="questions__arrow">
                    <img
                      src="./public/images/arrow.svg"
                      alt="arrow"
                      className="questions__img"
                    />
                  </span>
                </h3>

                <p className="questions__show">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
                  facere, quidem eum id excepturi assumenda explicabo nam
                  accusamus veritatis voluptates eveniet adipisci, dicta nihil
                  nemo modi possimus officiis quam atque? Lorem ipsum, dolor sit
                  amet consectetur adipisicing elit. Quos facere, quidem eum id
                  excepturi assumenda explicabo nam accusamus veritatis
                  voluptates eveniet adipisci, dicta nihil nemo modi possimus
                  officiis quam atque?
                </p>
              </div>
            </article>

            <article className="questions__padding">
              <div className="questions__answer">
                <h3 className="questions__title">
                  ¿Qué es CSS GRID?
                  <span className="questions__arrow">
                    <img
                      src="./public/images/arrow.svg"
                      alt="arrow"
                      className="questions__img"
                    />
                  </span>
                </h3>

                <p className="questions__show">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
                  facere, quidem eum id excepturi assumenda explicabo nam
                  accusamus veritatis voluptates eveniet adipisci, dicta nihil
                  nemo modi possimus officiis quam atque? Lorem ipsum, dolor sit
                  amet consectetur adipisicing elit. Quos facere, quidem eum id
                  excepturi assumenda explicabo nam accusamus veritatis
                  voluptates eveniet adipisci, dicta nihil nemo modi possimus
                  officiis quam atque?
                </p>
              </div>
            </article>
          </section>

          <section className="questions__offer">
            <h2 className="subtitle">¿Estas listo para aprender CSS?</h2>
            <p className="questions__copy">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
              ratione architecto magnam, officiis ex porro vero est voluptates
              quaerat quibusdam illo veniam reprehenderit eius atque tempora
              iure ab non autem.
            </p>
            <a href="/registro" className="btnComienza">
              Aprende ahora
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
            <h2 className="footer__newsletter">Suscribete a la newsletter</h2>
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

      <script src="./public/js/slider.js"></script>
      <script src="./public/js/questions.js"></script>
      <script src="./public/js/menu.js"></script>
    </div>
  );
};

export default Inicio;
