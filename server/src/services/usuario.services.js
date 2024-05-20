import { Empleado } from "../models/Empleado.js";
import { Usuario } from "../models/Usuario.js";
import { UsuarioDTO } from "../dtos/usuario.dto.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export async function registrarUsuario(nombre, correo, contraseña) {
  try {
    // Verificar si el correo ya está en uso
    const usuarioEncontrado = await Usuario.findOne({
      where: {
        correo: correo,
      },
    });

    if (usuarioEncontrado) {
      throw new Error("El correo ya está en uso");
    }

    const empleadoEncontrado = await Empleado.findOne({
      where: {
        correo: correo,
      },
    });

    if (empleadoEncontrado) {
      throw new Error("El correo ya está en uso");
    }

    // Hash de la contraseña
    const contraseñaHash = await bcrypt.hash(contraseña, 10);

    // Crear el nuevo usuario
    const newUsuario = new Usuario({
      nombre,
      correo,
      contraseña: contraseñaHash,
    });

    // Guardar el usuario en la base de datos
    const UsuarioGuardado = await newUsuario.save();

    // // Crear token de acceso
    // const token = await createAccessToken({
    //   idUsuario: UsuarioGuardado.idUsuario,
    // });

    // Crear y devolver un DTO de usuario
    return new UsuarioDTO(
      UsuarioGuardado.idUsuario,
      UsuarioGuardado.nombre,
      UsuarioGuardado.correo,
      // token
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function iniciarSesion(correo, contraseña) {
  try {
    // Buscar usuario por correo electrónico
    const usuarioEncontrado = await Usuario.findOne({
      where: {
        correo: correo,
      },
    });

    if (!usuarioEncontrado) {
      throw new Error("El correo electrónico no existe");
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(
      contraseña,
      usuarioEncontrado.contraseña
    );
    if (!isMatch) {
      throw new Error("La contraseña es incorrecta");
    }

    // Generar token de acceso
    const token = await createAccessToken({
      idUsuario: usuarioEncontrado.idUsuario,
      nombre: usuarioEncontrado.nombre,
    });

    // Crear y devolver DTO de usuario logueado
    return new UsuarioDTO(
      usuarioEncontrado.idUsuario,
      usuarioEncontrado.nombre,
      usuarioEncontrado.correo,
      token
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

// export async function obtenerUsuarios() {
//   try {
//     const usuarios = await Usuario.findAll({
//       attributes: ["idUsuario", "nombre", "correo", "contraseña"],
//     });
//     return usuarios.map(
//       (usuario) =>
//         new UsuarioDTO(
//           usuario.idUsuario,
//           usuario.nombre,
//           usuario.correo,
//           usuario.contraseña
//         )
//     );
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export async function obtenerUsuarioPorId(idUsuario) {
//   try {
//     const usuario = await Usuario.findByPk(idUsuario);
//     return new UsuarioDTO(
//       usuario.idUsuario,
//       usuario.nombre,
//       usuario.correo,
//       usuario.contraseña
//     );
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export async function crearUsuario(nombre, correo, contraseña) {
//   try {
//     const newUsuario = await Usuario.create({
//       nombre,
//       correo,
//       contraseña,
//     });
//     return new UsuarioDTO(
//       newUsuario.idUsuario,
//       newUsuario.nombre,
//       newUsuario.correo,
//       newUsuario.contraseña
//     );
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export async function actualizarUsuario(idUsuario, nombre, correo, contraseña) {
//   try {
//     const usuario = await Usuario.findByPk(idUsuario);
//     usuario.nombre = nombre;
//     usuario.correo = correo;
//     usuario.contraseña = contraseña;
//     await usuario.save();
//     return new UsuarioDTO(
//       usuario.idUsuario,
//       usuario.nombre,
//       usuario.correo,
//       usuario.contraseña
//     );
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }

// export async function eliminarUsuario(idUsuario) {
//   try {
//     await Usuario.destroy({
//       where: {
//         idUsuario,
//       },
//     });
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }
