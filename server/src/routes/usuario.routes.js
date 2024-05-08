import { Router } from "express";
import {
  postRegistroUsuario,
  postCerrarSesion,
  postIniciarSesion,
  verifyToken
} from "../controllers/usuario.controllers.js";

const router = Router();

// router.get("/usuarios", getUsuarios);
// router.post("/usuarios", postUsuario);
// router.put("/usuarios/:idUsuario", putUsuario);
// router.delete("/usuarios/:idUsuario", deleteUsuario);
// router.get("/usuarios/:idUsuario", getUsuario);

//nuevos
router.post("/login", postIniciarSesion);
router.post("/register", postRegistroUsuario);
router.get("/verify", verifyToken);
router.post("/logout", postCerrarSesion);

export default router;
