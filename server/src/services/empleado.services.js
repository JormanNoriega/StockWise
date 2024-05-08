import { Empleado } from "../models/Empleado.js";
import { EmpleadoDTO } from "../dtos/empleado.dto.js";

//Crear un Empleado
export async function crearEmpleado(nombre, correo, contraseña, idUsuario) {
  try {
    const newEmpleado = await Empleado.create({
      nombre,
      correo,
      contraseña,
      idUsuario,
    });
    return new EmpleadoDTO(
      newEmpleado.idEmpleado,
      newEmpleado.nombre,
      newEmpleado.correo,
      newEmpleado.contraseña,
      newEmpleado.idUsuario
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
    empleado.nombre = nombre;
    empleado.correo = correo;
    empleado.contraseña = contraseña;
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
