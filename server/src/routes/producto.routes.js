import { Router } from "express";
import {
  deleteProducto,
  getProducto,
  getProductos,
  postProducto,
  putProducto,
} from "../controllers/producto.controllers.js";
import { usuarioRequerido } from "../middlewares/usuario.middleware.js";

const router = Router();

//Rutas Protegidas para Usuarios
router.post("/productos", usuarioRequerido, postProducto); //crear Producto
router.get("/productos", usuarioRequerido, getProductos); //obtener todos los Producto
router.get("/productos/:codProducto", usuarioRequerido, getProducto); // obtener un Producto
router.put("/productos/:codProducto", usuarioRequerido, putProducto); // editar un Producto
router.delete("/productos/:codProducto", usuarioRequerido, deleteProducto); //eliminar un Producto

export default router;
