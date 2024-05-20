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

//nuevos
router.post("/empleados", usuarioRequerido, postEmpleado); //crearEmpleado
router.get("/empleados", usuarioRequerido, getEmpleados); //obtener todos los empleados
router.get("/empleados/:idEmpleado", usuarioRequerido, getEmpleado); // obtener un empleado
router.put("/empleados/:idEmpleado", usuarioRequerido, putEmpleado); // editar un empleado
router.delete("/empleados/:idEmpleado", usuarioRequerido, deleteEmpleado); //eliminar un empleado
router.post("/loginEmpleado", postIniciarSesion);
router.get("/verifyEmpleado", verifyToken);

export default router;
