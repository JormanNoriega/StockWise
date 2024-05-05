import { Proveedor } from "../models/Proveedor.js";
import { ProveedorDTO } from "../dtos/proveedor.dto.js";

//obtener Todos los proveedores
export async function obtenerProveedores() {
  try {
    const proveedores = await Proveedor.findAll({
      attributes: [
        "idProveedor",
        "idUsuario",
        "nombProveedor",
        "telefono",
        "correo",
      ],
    });
    return proveedores.map(
      (proveedores) =>
        new ProveedorDTO(
          proveedores.idProveedor,
          proveedores.idUsuario,
          proveedores.nombProveedor,
          proveedores.telefono,
          proveedores.correo
        )
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

//Obtener Todas los proveedores de un usuario
export async function obtenerProveedoresDeUsuario(idUsuario) {
  try {
    const proveedores = await Proveedor.findAll({
      where: {
        idUsuario: idUsuario,
      },
    });
    return proveedores.map(
      (proveedores) =>
        new ProveedorDTO(
          proveedores.idProveedor,
          proveedores.idUsuario,
          proveedores.nombProveedor,
          proveedores.telefono,
          proveedores.correo
        )
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

//Obtener una Categora de un usuario
export async function obtenerProveedorDeUsuario(idUsuario, idProveedor) {
  try {
    const proveedor = await Proveedor.findOne({
      where: {
        idUsuario: idUsuario,
        idProveedor: idProveedor,
      },
    });
    if (proveedor) {
      return new ProveedorDTO(
        proveedor.idProveedor,
        proveedor.idUsuario,
        proveedor.nombProveedor,
        proveedor.telefono,
        proveedor.correo
      );
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

//Crear Proveedor a un Usuario
export async function crearProveedor(
  idUsuario,
  nombProveedor,
  telefono,
  correo
) {
  try {
    const newProveedor = await Proveedor.create({
      idUsuario,
      nombProveedor,
      telefono,
      correo,
    });
    return new ProveedorDTO(
      newProveedor.idProveedor,
      newProveedor.idUsuario,
      newProveedor.nombProveedor,
      newProveedor.telefono,
      newProveedor.correo
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

//Actualizar Proveedor de un Usuario
export async function actualizarProveedor(
  idProveedor,
  idUsuario,
  nombProveedor,
  telefono,
  correo
) {
  try {
    const proveedor = await Proveedor.findOne({
      where: {
        idProveedor: idProveedor,
        idUsuario: idUsuario,
      },
    });
    (proveedor.nombProveedor = nombProveedor),
      (proveedor.telefono = telefono),
      (proveedor.correo = correo);
    await proveedor.save();
    return new ProveedorDTO(
      proveedor.idProveedor,
      proveedor.idUsuario,
      proveedor.nombProveedor,
      proveedor.telefono,
      proveedor.correo
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

//Eliminar Proveedor de un usuario
export async function eliminarProveedor(idProveedor, idUsuario) {
  try {
    await Proveedor.destroy({
      where: {
        idProveedor: idProveedor,
        idUsuario: idUsuario,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
