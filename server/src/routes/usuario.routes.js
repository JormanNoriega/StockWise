import { Router } from "express";
import {
  getUsuarios,
  postUsuario,
  getUsuario,
  putUsuario,
  deleteUsuario,
  postRegistroUsuario,
  postIniciarSesion
} from "../controllers/usuario.controllers.js";

const router = Router();


router.get("/usuarios", getUsuarios);
router.post("/usuarios", postUsuario);
router.put("/usuarios/:idUsuario", putUsuario);
router.delete("/usuarios/:idUsuario", deleteUsuario); //toca eliminar antes todo lo q tenga en otras tablas :D
router.get("/usuarios/:idUsuario", getUsuario);

//nuevos
router.post("/login", postIniciarSesion);
router.post("/register", postRegistroUsuario);

export default router;
