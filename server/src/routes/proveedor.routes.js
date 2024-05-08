import { Router } from "express";
import {
  getProveedores,
  postProveedor,
  getProveedor,
  putProveedor,
  deleteProveedor,
} from "../controllers/proveedor.controllers.js";
import { usuarioRequerido } from "../middlewares/usuario.middleware.js";

const router = Router();

//nuevos
router.post("/proveedores", usuarioRequerido, postProveedor); //crear Producto
router.get("/proveedores", usuarioRequerido, getProveedores); //obtener todos los Producto
router.get("/proveedores/:idProveedor", usuarioRequerido, getProveedor); // obtener un Producto
router.put("/proveedores/:idProveedor", usuarioRequerido, putProveedor); // editar un Producto
router.delete("/proveedores/:idProveedor", usuarioRequerido, deleteProveedor); //eliminar un Producto

export default router;
