import * as empleadoService from "../services/empleado.services.js";

// Controlador para obtener todos los empleados
export async function getEmpleados(req, res) {
  try {
    const empleados = await empleadoService.obtenerEmpleados();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controlador para obtener todos los empleados de un usuario específico
export async function getEmpleadosDeUsuario(req, res) {
  const { idUsuario } = req.params;
  try {
    const empleados = await empleadoService.obtenerEmpleadosDeUsuario(
      idUsuario
    );
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controlador para obtener un empleado de un usuario
export async function getEmpleadoDeUsuario(req, res) {
  const { idUsuario } = req.params;
  const { idEmpleado } = req.params;
  try {
    const empleado = await empleadoService.obtenerEmpleadoDeUsuario(
      idUsuario,
      idEmpleado
    );
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controlador para crear un nuevo empleado para un usuario
export async function postEmpleado(req, res) {
  const { idUsuario } = req.params.idUsuario;
  const { nombre, correo, contraseña } = req.body;
  try {
    const nuevoEmpleado = await empleadoService.crearEmpleado(
      nombre,
      correo,
      contraseña,
      idUsuario
    );
    res.json(nuevoEmpleado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Controlador para actualizar un empleado de un usuario
export async function putEmpleado(req, res) {
  const { idUsuario } = req.params;
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

// Controlador para eliminar un empleado de un usuario
export async function deleteEmpleado(req, res) {
  const { idEmpleado } = req.params;
  const { idUsuario } = req.params;
  try {
    await empleadoService.eliminarEmpleado(idEmpleado, idUsuario);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
