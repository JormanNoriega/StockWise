import { Router } from "express";
import {getUsuarios,createUsuario} from "../controllers/usuario.controllers.js"

const router = Router();


router.get("/usuarios",getUsuarios);
router.post("/usuarios",createUsuario);
router.put("/usuarios/:id");
router.delete("/usuarios/:id");
router.get("/usuarios/:id");

export default router;
