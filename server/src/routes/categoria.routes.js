import { Router } from "express";
import { deleteCategoria, getCategoriaDeUsuario, getCategorias, getCategoriasDeUsuario, postCategoria, putCategoria } from "../controllers/categoria.controllers.js";


const router = Router();

router.get("/categorias",getCategorias); //todas las categorias
router.get("/usuarios/:idUsuario/categorias",getCategoriasDeUsuario); //todas de un usuario
router.get("/usuarios/:idUsuario/categorias/:idCategoria",getCategoriaDeUsuario); //una de un usuario
router.post("/usuarios/:idUsuario/categorias/", postCategoria);
router.put("/usuarios/:idUsuario/categorias/:idCategoria", putCategoria);
router.delete("/usuarios/:idUsuario/categorias/:idCategoria", deleteCategoria);


export default router;