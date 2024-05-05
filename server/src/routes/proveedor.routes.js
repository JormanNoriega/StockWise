import { Router } from "express";
import { deleteProveedor, getProveedorDeUsuario, getProveedores, getProveedoresDeUsuario, postProveedor, putProveedor } from '../controllers/proveedor.controllers.js'

const router = Router();

router.get("/proveedores",getProveedores); //todos los empleados
router.get("/usuarios/:idUsuario/proveedores/",getProveedoresDeUsuario); //todos los empleados de un usuario
router.get("/usuarios/:idUsuario/proveedores/:idProveedor",getProveedorDeUsuario); //un empleado de un usuario
router.post("/usuarios/:idUsuario/proveedores/", postProveedor);
router.put("/usuarios/:idUsuario/proveedores/:idProveedor", putProveedor);
router.delete("/usuarios/:idUsuario/proveedores/:idProveedor", deleteProveedor);


export default router;
