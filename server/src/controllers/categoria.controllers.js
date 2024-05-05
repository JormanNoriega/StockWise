import * as categoriaService from "../services/categoria.services.js";

//Obtener todas las categorias
export async function getCategorias(req, res) {
  try {
    const categorias = await categoriaService.obtenerCategorias();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Obtener todas las categorias de un usuario
export async function getCategoriasDeUsuario(req, res) {
  const { idUsuario } = req.params;
  try {
    const categorias = await categoriaService.obtenerCategoriasDeUsuario(
      idUsuario
    );
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Obtener una categoria de un usuario
export async function getCategoriaDeUsuario(req, res) {
  const { idUsuario } = req.params;
  const { idCategoria } = req.params;
  try {
    const categoria = await categoriaService.obtenerCategoriaDeUsuario(
      idUsuario,
      idCategoria
    );
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Crear una categoria para un usuario
export async function postCategoria(req, res) {
  const { idUsuario } = req.params;
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

// Actualizar una Categoria de un usuario
export async function putCategoria(req, res) {
  const { idUsuario, idCategoria } = req.params;
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
  const { idUsuario } = req.params;
  try {
    await categoriaService.eliminarCategoria(idCategoria, idUsuario);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
