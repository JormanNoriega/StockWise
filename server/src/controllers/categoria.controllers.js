import * as categoriaService from "../services/categoria.services.js";

// Crear categoria
export async function postCategoria(req, res) {
  const idUsuario = req.usuario.idUsuario;
  const { nombCatergoria } = req.body;
  try {
    const newCategoria = await categoriaService.crearCategoria(
      idUsuario,
      nombCatergoria
    );
    res.json(newCategoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Obtener todas las Categorias
export async function getCategorias(req, res) {
  const idUsuario = req.usuario.idUsuario;
  try {
    const categorias = await categoriaService.obtenerCategorias(idUsuario);
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Obtener una categoria de un usuario
export async function getCategoria(req, res) {
  const idUsuario = req.usuario.idUsuario;
  const { idCategoria } = req.params;
  try {
    const categoria = await categoriaService.obtenerCategoria(
      idUsuario,
      idCategoria
    );
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Actualizar una Categoria de un usuario
export async function putCategoria(req, res) {
  const idUsuario = req.usuario.idUsuario;
  const { idCategoria } = req.params;
  const { nombCatergoria } = req.body;
  try {
    const categoriaActualizada = await categoriaService.actualizarCategoria(
      idCategoria,
      idUsuario,
      nombCatergoria
    );
    res.json(categoriaActualizada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Eliminar una Categoria de un usuario
export async function deleteCategoria(req, res) {
  const { idCategoria } = req.params;
  const idUsuario = req.usuario.idUsuario;
  try {
    await categoriaService.eliminarCategoria(idCategoria, idUsuario);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
