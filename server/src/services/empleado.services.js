import { Usuario } from "../models/Usuario.js";
import { Venta } from "../models/Venta.js";
import { Empleado } from "../models/Empleado.js";
import { EmpleadoDTO } from "../dtos/empleado.dto.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

async function validarCorreo(correo) {
  const usuarioEncontrado = await Usuario.findOne({
    where: { correo: correo },
  });

  if (usuarioEncontrado) {
    throw new Error("El correo ya está en uso por un usuario");
  }

  const empleadoEncontrado = await Empleado.findOne({
    where: { correo: correo },
  });

  if (empleadoEncontrado) {
    throw new Error("El correo ya está en uso por un empleado");
  }
}

//Crear un Empleado
export async function crearEmpleado(nombre, correo, contraseña, idUsuario) {
  try {

    await validarCorreo(correo);
    // Hash de la contraseña
    const contraseñaHash = await bcrypt.hash(contraseña, 10);

    const newEmpleado = new Empleado({
      idUsuario,
      nombre,
      correo,
      contraseña: contraseñaHash,
    });

    const EmpleadoGuardado = await newEmpleado.save();
    return new EmpleadoDTO(
      EmpleadoGuardado.idEmpleado,
      EmpleadoGuardado.nombre,
      EmpleadoGuardado.correo,
      EmpleadoGuardado.contraseña,
      EmpleadoGuardado.idUsuario
    );
  } catch (error) {
    throw new Error(error.message);
  }
}            

//Obtener Todos los Empleados
export async function obtenerEmpleados(idUsuario) {
  try {
    const empleados = await Empleado.findAll({
      where: {
        idUsuario: idUsuario,
      },
    });
    return empleados.map(
      (empleado) =>
        new EmpleadoDTO(
          empleado.idEmpleado,
          empleado.nombre,
          empleado.correo,
          empleado.contraseña,
          empleado.idUsuario
        )
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

//Obtener un Empleado
export async function obtenerEmpleado(idUsuario, idEmpleado) {
  try {
    const empleado = await Empleado.findOne({
      where: {
        idUsuario: idUsuario,
        idEmpleado: idEmpleado,
      },
    });
    if (empleado) {
      // Si se encontró un empleado, devolverlo como un objeto
      return new EmpleadoDTO(
        empleado.idEmpleado,
        empleado.nombre,
        empleado.correo,
        empleado.contraseña,
        empleado.idUsuario
      );
    } else {
      // Si no se encontró ningún empleado, devolver null
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

//Actualizar Empleado de un Usuario
export async function actualizarEmpleado(
  idEmpleado,
  nombre,
  correo,
  contraseña,
  idUsuario
) {
  try {
    const empleado = await Empleado.findOne({
      where: {
        idEmpleado: idEmpleado,
        idUsuario: idUsuario,
      },
    });

    const contraseñaHash = await bcrypt.hash(contraseña, 10);

    empleado.nombre = nombre;
    empleado.correo = correo;
    empleado.contraseña = contraseñaHash;
    await empleado.save();
    return new EmpleadoDTO(
      empleado.idEmpleado,
      empleado.nombre,
      empleado.correo,
      empleado.contraseña,
      empleado.idUsuario
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

//Eliminar Empleado de un usuario
export async function eliminarEmpleado(idEmpleado, idUsuario) {
  try {
    const ventas = await Venta.findAll({
      where: {
        idEmpleado: idEmpleado,
      },
    });

    if (ventas.length > 0) {
      throw new Error("No se puede eliminar el empleado, tiene ventas asociadas");
    }

    await Empleado.destroy({
      where: {
        idEmpleado: idEmpleado,
        idUsuario: idUsuario,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function iniciarSesion(correo, contraseña) {
  try {
    // Buscar usuario por correo electrónico
    const empleadoEncontrado = await Empleado.findOne({
      where: {
        correo: correo,
      },
    });

    if (!empleadoEncontrado) {
      throw new Error("El correo electrónico no existe");
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(
      contraseña,
      empleadoEncontrado.contraseña
    );
    if (!isMatch) {
      throw new Error("La contraseña es incorrecta");
    }

    // Generar token de acceso
    const token = await createAccessToken({
      idEmpleado: empleadoEncontrado.idEmpleado,
      nombre: empleadoEncontrado.nombre,
      idUsuario: empleadoEncontrado.idUsuario,
    });

    // Crear y devolver DTO de empleado logueado
    return new EmpleadoDTO(
      empleadoEncontrado.idEmpleado,
      empleadoEncontrado.nombre,
      empleadoEncontrado.correo,
      empleadoEncontrado.contraseña,
      empleadoEncontrado.idUsuario,
      token
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
