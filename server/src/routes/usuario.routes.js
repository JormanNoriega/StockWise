import { Router } from "express";
import {
  getUsuarios,
  createUsuario,
  getUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuario.controllers.js";

const router = Router();

router.get("/", getUsuarios);
router.post("/", createUsuario);
router.put("/:idUsuario", updateUsuario);
router.delete("/:idUsuario", deleteUsuario); //toca eliminar antes todo lo q tenga en otras tablas :D
router.get("/:idUsuario", getUsuario);

export default router;
