import * as UsuarioService from "../services/usuario.services.js";

//Obtener todos los usuarios
export async function getUsuarios(req, res) {
  try {
    const usuarios = await UsuarioService.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Obtener un usuario
export async function getUsuario(req, res) {
  const { idUsuario } = req.params;
  try {
    const usuario = await UsuarioService.obtenerUsuarioPorId(idUsuario);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Crear un Usuario
export async function postUsuario(req, res) {
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

//Actualizar un usuario
export async function putUsuario(req, res) {
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

//Eliminar un usuario
export async function deleteUsuario(req, res) {
  const { idUsuario } = req.params;
  try {
    await UsuarioService.eliminarUsuario(idUsuario);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Iniciar Seccion
export async function getIniciarSesion(req, res) {
  const { correo, contraseña } = req.body;
  try {
    const usuario = await UsuarioService.iniciarSesion(correo, contraseña);
    if (usuario) {
      res.json(usuario); // Si se encontró un usuario, devolverlo como respuesta
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" }); // Si no se encontró un usuario, devolver un mensaje de error
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
