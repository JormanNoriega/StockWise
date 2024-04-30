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

export async function getUsuario(req, res) {
  const { idUsuario } = req.params;
  try {
    const usuario = await Usuario.findOne({
      where: {
        idUsuario,
      },
    });
    res.json(usuario);
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

export const updateUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const { nombre, correo, contraseña } = req.body;

    const usuario = await Usuario.findByPk(idUsuario);
    usuario.nombre = nombre;
    usuario.correo = correo;
    usuario.contraseña = contraseña;
    await usuario.save();

    res.json(usuario);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  try {
    //vaciar antes las tablas relacionadas
    await Usuario.destroy({
      where: {
        idUsuario,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
