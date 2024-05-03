import { Router } from "express";
import {
  getUsuarios,
  createUsuario,
  getUsuario,
  updateUsuario,
  deleteUsuario,
  getIniciarSesion
} from "../controllers/usuario.controllers.js";

const router = Router();

//Prueba github
router.get("/usuarios", getUsuarios);
router.post("/usuarios", createUsuario);
router.put("/usuarios/:idUsuario", updateUsuario);
router.delete("/usuarios/:idUsuario", deleteUsuario); //toca eliminar antes todo lo q tenga en otras tablas :D
router.get("/usuarios/:idUsuario", getUsuario);
router.get("/login", getIniciarSesion);

export default router;
