import { Router } from "express";
import {
  deleteCategoria,
  getCategoria,
  getCategorias,
  postCategoria,
  putCategoria,
} from "../controllers/categoria.controllers.js";
import { usuarioRequerido } from "../middlewares/usuario.middleware.js";

const router = Router();

router.post("/categorias", usuarioRequerido, postCategoria); //crear categoria
router.get("/categorias", usuarioRequerido, getCategorias); // obtener todas las categorias
router.get("/categorias/:idCategoria", usuarioRequerido, getCategoria); // obtener una categoria
router.put("/categorias/:idCategoria", usuarioRequerido, putCategoria); //modificar una categoria
router.delete("/categorias/:idCategoria", usuarioRequerido, deleteCategoria); //eliminar una categoria

export default router;
