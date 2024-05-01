import * as UsuarioService from "../services/usuario.services.js";

export async function getUsuarios(req, res) {
  try {
    const usuarios = await UsuarioService.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUsuario(req, res) {
  const { idUsuario } = req.params;
  try {
    const usuario = await UsuarioService.obtenerUsuarioPorId(idUsuario);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createUsuario(req, res) {
  const { nombre, correo, contraseña } = req.body;
  try {
    const newUsuario = await UsuarioService.crearUsuario(
      nombre,
      correo,
      contraseña
    );
    res.json(newUsuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateUsuario(req, res) {
  const { idUsuario } = req.params;
  const { nombre, correo, contraseña } = req.body;
  try {
    const usuario = await UsuarioService.actualizarUsuario(
      idUsuario,
      nombre,
      correo,
      contraseña
    );
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteUsuario(req, res) {
  const { idUsuario } = req.params;
  try {
    await UsuarioService.eliminarUsuario(idUsuario);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
