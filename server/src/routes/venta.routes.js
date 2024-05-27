import { Router } from "express";
import {
  postVenta,
  getVenta,
  getVentas,
  obtenerProductosDelEmpleado
} from "../controllers/venta.controllers.js";
import { usuarioRequerido } from "../middlewares/usuario.middleware.js";

const router = Router();

router.post("/ventas", usuarioRequerido, postVenta); // crear Venta
router.get("/obtenerProductos", usuarioRequerido, obtenerProductosDelEmpleado); // obtener productos
router.get("/ventas", usuarioRequerido, getVentas); // obtener todas las Ventas
router.get("/ventas/:idVenta", usuarioRequerido, getVenta); // obtener una Venta

export default router;
