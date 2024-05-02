import { Router } from "express";
import { actualizarEmpleado, eliminarEmpleado, getEmpleados, getEmpleadosDeUsuario,crearEmpleado, getEmpleadoDeUsuario } from "../controllers/empleado.controllers.js";

const router = Router();

router.get("/empleados",getEmpleados); //todos los empleados
router.get("/usuarios/:idUsuario/empleados/",getEmpleadosDeUsuario); //todos los empleados de un usuario
router.get("/usuarios/:idUsuario/empleados/:idEmpleado",getEmpleadoDeUsuario); //un empleado de un usuario
router.post("/usuarios/:idUsuario/empleados/", crearEmpleado);
router.put("/usuarios/:idUsuario/empleados/:idEmpleado", actualizarEmpleado);
router.delete("/usuarios/:idUsuario/empleados/:idEmpleado", eliminarEmpleado);


export default router;
