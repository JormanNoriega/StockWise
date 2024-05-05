import { Router } from "express";
import { putEmpleado, deleteEmpleado, getEmpleados, getEmpleadosDeUsuario,postEmpleado, getEmpleadoDeUsuario } from "../controllers/empleado.controllers.js";

const router = Router();

router.get("/empleados",getEmpleados); //todos los empleados
router.get("/usuarios/:idUsuario/empleados/",getEmpleadosDeUsuario); //todos los empleados de un usuario
router.get("/usuarios/:idUsuario/empleados/:idEmpleado",getEmpleadoDeUsuario); //un empleado de un usuario
router.post("/usuarios/:idUsuario/empleados/", postEmpleado);
router.put("/usuarios/:idUsuario/empleados/:idEmpleado", putEmpleado);
router.delete("/usuarios/:idUsuario/empleados/:idEmpleado", deleteEmpleado);


export default router;
