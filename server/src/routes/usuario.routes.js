import { Router } from "express";
import {
  getUsuarios,
  createUsuario,
  getUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuario.controllers.js";

const router = Router();


router.get("/usuarios", getUsuarios);
router.post("/usuarios", createUsuario);
router.put("/usuarios/:idUsuario", updateUsuario);
router.delete("/usuarios/:idUsuario", deleteUsuario); //toca eliminar antes todo lo q tenga en otras tablas :D
router.get("/usuarios/:idUsuario", getUsuario);

export default router;
