import * as empleadoService from "../services/empleado.services.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";
import { Empleado } from "../models/Empleado.js";

//Crear un Empleado
export const postEmpleado = async (req, res) => {
  try {
    const idUsuario = req.usuario.idUsuario;
    const { nombre, correo, contraseña } = req.body;
    const newEmpleado = await empleadoService.crearEmpleado(nombre,correo,contraseña,idUsuario)
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

export const postIniciarSesion = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const empleadoLogeado = await empleadoService.iniciarSesion(
      correo,
      contraseña
    );
    res.cookie("token", empleadoLogeado.token);
    res.json(empleadoLogeado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if(!token) return res.status(401).json({message: 
    "Unauthorized hola"});

  jwt.verify(token, TOKEN_SECRET, async (err, empleado) => {
    if(err) return res.status(401).json({message: 
      "Unauthorized hola 2"});

    const empleadoEncontrado = await Empleado.findByPk(empleado.idEmpleado);
    if(!empleadoEncontrado) return res.status(401).json({ message: 
      "Unauthorized hola 3" });

    return res.json(empleadoEncontrado);
  })
}