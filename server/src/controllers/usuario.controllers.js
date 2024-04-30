import { Usuario } from "../models/Usuario.js";


export async function getUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll({
      atributes: ["idUsuario", "nombre", "priority", "correo", "contraseña"],
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createUsuario(req, res) {
  const { nombre, correo, contraseña } = req.body;
  try {
    let newUsuario = await Usuario.create(
      {
        nombre,
        correo,
        contraseña,
      },
      {
        fields: ["nombre", "correo", "contraseña"],
      }
    );
    return res.json(newUsuario);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
  res.json("received");
}
