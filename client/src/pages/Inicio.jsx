import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/inicio.css";
import logoAzul from "../assets/LogoSinFondo.png";

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <article className={`questions__padding ${isOpen ? 'questions__padding--add' : ''}`}>
    <div className="questions__title" onClick={onClick}>
      {question}
      <span className={`questions__arrow ${isOpen ? 'questions__arrow--rotate' : ''}`}>
        <img src="./public/images/arrow.svg" alt="arrow" className="questions__img" />
      </span>
    </div>
    <div className={`questions__show ${isOpen ? 'questions__show--visible' : ''}`}>
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
      answer: "Un gestor es una persona o sistema encargado de administrar y manejar eficientemente determinados recursos, actividades o procesos. Su función principal es gestionar, organizar y realizar las tareas necesarias para el adecuado funcionamiento y consecución de objetivos específicos.",
    },
    {
      question: "¿Qué es un inventario?",
      answer: "Un inventario es un registro documental y detallado de los bienes, mercancías, materiales o productos que posee una empresa, organización o persona en un momento determinado. Es básicamente un listado que especifica las cantidades, características y ubicación de cada artículo almacenado. Los inventarios permiten tener un control sobre la existencia de los productos y facilitan la gestión, planificación y toma de decisiones sobre las operaciones de compra, venta, producción, etc.",
    },
    {
      question: "¿Cómo puedo utilizar la app?",
      answer: "Para utilizar la aplicación te tienes que logear como usuario, ese usuario, que será el dueño del negocio que se vaya administrar deberá empezar ingresar la información de todo su negocio incluyendo proveedores y deberá crear categorías para cada uno de sus productos para llevar la gestión más avanzada. También deberá ingresar la información básica de sus empleados que son los encargados de la información y gestión de las ventas del negocio. Los reportes son automatizados, solo deberán generarlos a través de un botón y listo.",
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
              <Link to="/login" className="nav-links">Iniciar Sesión</Link>
            </li>
            <li className="nav-items">
              <Link to="/registro" className="nav-links">Registrarse</Link>
            </li>
          </ul>
        </nav>
        <section className="hero-contenedor contenedor">
          <h1 className="hero-titulo">StockWise</h1>
          <p className="hero-parrafo">Elige administrar tu negocio de la manera más eficiente con nosotros :D</p>
          <Link to="/registro" className="btnComienza">Comienza ahora</Link>
        </section>
      </header>

      <main>
        <section className="contenedor about">
          <h2 className="subtitle">¿Qué necesita tener un bien negocio?</h2>
          <p className="about__paragraph">
            Un buen empresario no solo es el que vende más, sino el que trata y administra
            su negocio como si fuera su vida.
          </p>

          <div className="about__main">
            <article className="about__icons">
              <img src="./public/images/shapes.svg" alt="shapes" className="about__icon" />
              <h3 className="about__title">Gestionar tu Inventario</h3>
              <p className="about__paragrah">
                Con StockWise obtendrás la gestión de tus productos lo más
                automatizado posible, ahorrándote dinero al tener que contratar a otra 
                persona o perdiendo el tiempo con un gestor manual. Filtrado de productos, control de stock,
                de categorías, proveedores, etc.
              </p>
            </article>

            <article className="about__icons">
              <img src="./public/images/paint.svg" alt="paint" className="about__icon" />
              <h3 className="about__title">Personalizar tu Negocio</h3>
              <p className="about__paragrah">
                StockWise puede personalizar la vista de interfaz utilizando
                el cambio de tema a modo oscuro o claro, así las personas que
                sufren de la vista no se cansarán con la aplicación.
              </p>
            </article>

            <article className="about__icons">
              <img src="./public/images/code.svg" alt="code" className="about__icon" />
              <h3 className="about__title">Sass</h3>
              <p className="about__paragrah">No se que es Sass.</p>
            </article>
          </div>
        </section>

        <section className="knowledge">
          <div className="knowledge__container contenedor">
            <div className="knowledege__texts">
              <h2 className="subtitle">
                Gestor completo de Inventario. ¡Controla tu stock de manera eficiente y rápida!
              </h2>
              <p className="knowledge__paragraph">
                Todo lo que necesitas a unos pocos clicks:
                reporte de inventarios, generar facturas en PDF,
                reporte de ventas, y más.
              </p>
              <a href="/login" className="btnComienza">Regístrate</a>
            </div>

            <figure className="knowledge__picture">
              <img src="./public/images/macbook.png" alt="macbook" className="knowledge__img" />
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
            <h2 className="subtitle">Si quieres utilizar nuestro producto, ¿Qué esperas?</h2>
            <p className="questions__copy">
              Si quieres utilizar nuestro producto deberás seguir los pasos que te dejamos
              en las preguntas. Si ya sabes manejarlo, no esperes más y regístrate.
            </p>
            <a href="/registro" className="btnComienza">Regístrate ahora</a>
          </section>
        </section>
      </main>

      <footer className="footer">
    <section className="footer__container contenedor">
        <h2 className="footer__title">StockWise - Sistema de Inventario</h2>
        <nav className="nav nav--footer">
            <ul className="nav__link nav__link--footer">
                <li className="nav-items">
                    <Link to="/login" className="nav-links">Iniciar Sesión</Link>
                </li>
                <li className="nav-items">
                    <Link to="/registro" className="nav-links">Registrarse</Link>
                </li>
            </ul>
            <form className="footer__form" action="https://formspree.io/f/mknkkrkj" method="POST">
                <div className="footer__inputs">
                    <input type="email" className="footer__input" placeholder="Email" required/>
                    <button type="submit" className="footer__submit">Regístrate</button>
                </div>
            </form>
        </nav>
    </section>
    <div className="footer__copy">
        <div className="footer__icons">
            <a href="#"><img src="./public/images/facebook.svg" alt="icon" className="footer__img"/></a>
            <a href="#"><img src="./public/images/twitter.svg" alt="icon" className="footer__img"/></a>
            <a href="#"><img src="./public/images/youtube.svg" alt="icon" className="footer__img"/></a>
        </div>
        <p className="footer__copyright">Derechos reservados © StockWise</p>
    </div>
</footer>

    </div>
  );
};

export default Inicio;
