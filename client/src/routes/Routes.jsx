import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Login from "../pages/login";
import Registro from "../pages/registro";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          {/*<Route path="/empleados" element={<ModuloEmpleado />} />*/}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
