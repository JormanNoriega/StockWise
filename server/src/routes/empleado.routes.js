import { Router } from "express";
import {
  putEmpleado,
  deleteEmpleado,
  getEmpleados,
  getEmpleado,
  postEmpleado,
  postIniciarSesion,
  verifyToken
} from "../controllers/empleado.controllers.js";
import { usuarioRequerido } from "../middlewares/usuario.middleware.js";

const router = Router();

//Rutas Para le gestion de empleados
router.post("/empleados", usuarioRequerido, postEmpleado);
router.get("/empleados", usuarioRequerido, getEmpleados); 
router.get("/empleados/:idEmpleado", usuarioRequerido, getEmpleado);
router.put("/empleados/:idEmpleado", usuarioRequerido, putEmpleado);
router.delete("/empleados/:idEmpleado", usuarioRequerido, deleteEmpleado);

//Rutas para autenticación de empleados
router.post("/loginEmpleado", postIniciarSesion);
router.get("/verifyEmpleado", verifyToken);

export default router;
