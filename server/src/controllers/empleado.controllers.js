import * as empleadoService from "../services/empleado.services.js";
import { Empleado } from "../models/Empleado.js";

//Crear un Empleado
export const postEmpleado = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    const newEmpleado = new Empleado({
      nombre,
      correo,
      contraseña,
      idUsuario: req.usuario.idUsuario,
    });
    await newEmpleado.save();
    res.json(newEmpleado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtener todos los empleados
export async function getEmpleados(req, res) {
  const idUsuario = req.usuario.idUsuario;
  try {
    const empleados = await empleadoService.obtenerEmpleados(idUsuario);
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Obtener un Empleado
export async function getEmpleado(req, res) {
  const idUsuario = req.usuario.idUsuario;
  const { idEmpleado } = req.params;
  try {
    const empleado = await empleadoService.obtenerEmpleado(
      idUsuario,
      idEmpleado
    );
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Actualizar un empleado
export async function putEmpleado(req, res) {
  const idUsuario = req.usuario.idUsuario;
  const { idEmpleado } = req.params;
  const { nombre, correo, contraseña } = req.body;
  try {
    const empleadoActualizado = await empleadoService.actualizarEmpleado(
      idEmpleado,
      nombre,
      correo,
      contraseña,
      idUsuario
    );
    res.json(empleadoActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Eliminar un empleado
export async function deleteEmpleado(req, res) {
  const { idEmpleado } = req.params;
  const idUsuario = req.usuario.idUsuario;
  try {
    await empleadoService.eliminarEmpleado(idEmpleado, idUsuario);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
