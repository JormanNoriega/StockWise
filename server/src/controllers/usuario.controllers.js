import { Usuario } from "../models/Usuario.js";
import * as UsuarioService from "../services/usuario.services.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";

export const postRegistroUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña } = req.body;
    const usuarioRegistrado = await UsuarioService.registrarUsuario(
      nombre,
      correo,
      contraseña
    );
    // res.cookie("token", usuarioRegistrado.token); para acceder de una depues de  registrar
    res.json(usuarioRegistrado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postIniciarSesion = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    const usuarioLogueado = await UsuarioService.iniciarSesion(
      correo,
      contraseña
    );
    res.cookie("token", usuarioLogueado.token);
    res.json(usuarioLogueado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postCerrarSesion = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if(!token) return res.status(401).json({message: 
    "Unauthorized"});

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if(err) return res.status(401).json({message: 
      "Unauthorized"});

    const userFound = await Usuario.findByPk(user.idUsuario);
    if(!userFound) return res.status(401).json({ message: 
      "Unauthorized" });

    return res.json(userFound);
  })
}

// //Obtener todos los usuarios
// export async function getUsuarios(req, res) {
//   try {
//     const usuarios = await UsuarioService.obtenerUsuarios();
//     res.json(usuarios);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// //Obtener un usuario
// export async function getUsuario(req, res) {
//   const { idUsuario } = req.params;
//   try {
//     const usuario = await UsuarioService.obtenerUsuarioPorId(idUsuario);
//     res.json(usuario);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// //Crear un Usuario
// export async function postUsuario(req, res) {
//   const { nombre, correo, contraseña } = req.body;
//   try {
//     const newUsuario = await UsuarioService.crearUsuario(
//       nombre,
//       correo,
//       contraseña
//     );
//     res.json(newUsuario);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// //Actualizar un usuario
// export async function putUsuario(req, res) {
//   const { idUsuario } = req.params;
//   const { nombre, correo, contraseña } = req.body;
//   try {
//     const usuario = await UsuarioService.actualizarUsuario(
//       idUsuario,
//       nombre,
//       correo,
//       contraseña
//     );
//     res.json(usuario);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// //Eliminar un usuario
// export async function deleteUsuario(req, res) {
//   const { idUsuario } = req.params;
//   try {
//     await UsuarioService.eliminarUsuario(idUsuario);
//     res.sendStatus(204);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// export const login = async (req, res) => {
//   try {
//     const { correo, contraseña } = req.body;
//     const usuarioEncontrado = await Usuario.findOne({
//       where: {
//         correo: correo,
//       },
//     });

//     if (!usuarioEncontrado)
//       return res.status(400).json({
//         message: ["The correo does not exist"],
//       });

//     const isMatch = await bcrypt.compare(
//       contraseña,
//       usuarioEncontrado.contraseña
//     );
//     if (!isMatch) {
//       return res.status(400).json({
//         message: ["The contraseña is incorrect"],
//       });
//     }

//     const token = await createAccessToken({
//       idUsuario: usuarioEncontrado.idUsuario,
//       nombre: usuarioEncontrado.nombre,
//     });

//     res.cookie("token", token, {
//       //httpOnly: process.env.NODE_ENV !== "development",
//       secure: false,
//       sameSite: "none",
//     });

//     res.json({
//       idUsuario: usuarioEncontrado.idUsuario,
//       nombre: usuarioEncontrado.nombre,
//       correo: usuarioEncontrado.correo,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
