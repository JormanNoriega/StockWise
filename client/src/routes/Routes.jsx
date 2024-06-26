import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import ProtectedRoutes from "../ProtectedRoutes";
import Inicio from "../pages/Inicio";
import Login from "../pages/login";
import Registro from "../pages/registro";
import Menu from "../pages/menu";
import { EmpleadoProvider } from "../context/empleadoContext";
import { CategoriaProvider } from "../context/categoriaContext";
import { ProveedorProvider } from "../context/proveedorContext";
import { ProductoProvider } from "../context/productoContext";
import { VentaProvider } from "../context/ventaContext";

const AppRoutes = () => {
  return (
    <>
      <AuthProvider>
        <EmpleadoProvider>
          <CategoriaProvider>
            <ProveedorProvider>
              <ProductoProvider>
                <VentaProvider>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Inicio />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/registro" element={<Registro />} />

                      <Route element={<ProtectedRoutes />}>
                        <Route path="/menu" element={<Menu />} />
                      </Route>
                    </Routes>
                  </BrowserRouter>
                </VentaProvider>
              </ProductoProvider>
            </ProveedorProvider>
          </CategoriaProvider>
        </EmpleadoProvider>
      </AuthProvider>
    </>
  );
};

export default AppRoutes;
