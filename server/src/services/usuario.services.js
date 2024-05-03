import { Usuario } from "../models/Usuario.js";
import { UsuarioDTO } from "../dtos/usuario.dto.js";

export async function obtenerUsuarios() {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ["idUsuario", "nombre", "correo", "contraseña"],
    });
    return usuarios.map(
      (usuario) =>
        new UsuarioDTO(
          usuario.idUsuario,
          usuario.nombre,
          usuario.correo,
          usuario.contraseña
        )
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function obtenerUsuarioPorId(idUsuario) {
  try {
    const usuario = await Usuario.findByPk(idUsuario);
    return new UsuarioDTO(
      usuario.idUsuario,
      usuario.nombre,
      usuario.correo,
      usuario.contraseña
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function crearUsuario(nombre, correo, contraseña) {
  try {
    const newUsuario = await Usuario.create({
      nombre,
      correo,
      contraseña,
    });
    return new UsuarioDTO(
      newUsuario.idUsuario,
      newUsuario.nombre,
      newUsuario.correo,
      newUsuario.contraseña
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function actualizarUsuario(idUsuario, nombre, correo, contraseña) {
  try {
    const usuario = await Usuario.findByPk(idUsuario);
    usuario.nombre = nombre;
    usuario.correo = correo;
    usuario.contraseña = contraseña;
    await usuario.save();
    return new UsuarioDTO(
      usuario.idUsuario,
      usuario.nombre,
      usuario.correo,
      usuario.contraseña
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function eliminarUsuario(idUsuario) {
  try {
    await Usuario.destroy({
      where: {
        idUsuario,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function iniciarSesion(correo, contraseña) {
  try {
    // Buscar un usuario con el correo electrónico y contraseña proporcionados
    const usuario = await Usuario.findOne({
      where: {
        correo: correo,
        contraseña: contraseña,
      },
    });
    // Si se encuentra un usuario, devolverlo
    if (usuario) {
      return new UsuarioDTO(
        usuario.idUsuario,
        usuario.nombre,
        usuario.correo,
        usuario.contraseña
      );
    } else {
      // Si no se encuentra un usuario, devolver null u otro indicador de que las credenciales son incorrectas
      return null;
    }
  } catch (error) {
    // Manejar cualquier error que ocurra durante la búsqueda del usuario
    throw new Error("Error al iniciar sesión: " + error.message);
  }
}
