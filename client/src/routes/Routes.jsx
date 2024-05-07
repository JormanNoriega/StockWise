import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import ProtectedRoutes from "../ProtectedRoutes";
import Inicio from "../pages/Inicio";
import Login from "../pages/login";
import Registro from "../pages/registro";
import Menu from "../pages/menu";
import FormEmpleado from "../components/Empleado/FormEmpleado";
import { EmpleadoProvider } from "../context/empleadoContext";

const AppRoutes = () => {
  return (
    <>
      <AuthProvider>
        <EmpleadoProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/menu" element={<Menu />} />
                <Route path="/empleado" element={<FormEmpleado />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </EmpleadoProvider>
      </AuthProvider>
    </>
  );
};

export default AppRoutes;
