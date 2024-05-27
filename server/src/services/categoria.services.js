import { Categoria } from "../models/Categoria.js";
import { CategoriaDTO } from "../dtos/categoria.dto.js";

async function validarCategoria(nombCatergoria, idUsuario) {
  const categoriaEncontrada = await Categoria.findOne({
    where: { nombCatergoria: nombCatergoria, idUsuario: idUsuario },
  });

  if (categoriaEncontrada) {
    throw new Error("La categoria ya está en uso");
  }
}

//Crear Categoria
export async function crearCategoria(idUsuario, nombCatergoria) {
  try {
    await validarCategoria(nombCatergoria,idUsuario);

    const newCategoria = await Categoria.create({
      idUsuario,
      nombCatergoria,
    });
    return new CategoriaDTO(
      newCategoria.idCategoria,
      newCategoria.idUsuario,
      newCategoria.nombCatergoria
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

//Obtener Todas las Categorias
export async function obtenerCategorias(idUsuario) {
  try {
    const categorias = await Categoria.findAll({
      where: {
        idUsuario: idUsuario,
      },
    });
    return categorias.map(
      (categorias) =>
        new CategoriaDTO(
          categorias.idCategoria,
          categorias.idUsuario,
          categorias.nombCatergoria
        )
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

//Obtener una Categora
export async function obtenerCategoria(idUsuario, idCategoria) {
  try {
    const categoria = await Categoria.findOne({
      where: {
        idUsuario: idUsuario,
        idCategoria: idCategoria,
      },
    });
    if (categoria) {
      return new CategoriaDTO(
        categoria.idCategoria,
        categoria.idUsuario,
        categoria.nombCatergoria
      );
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

//Actualizar Categoria
export async function actualizarCategoria(
  idCategoria,
  idUsuario,
  nombCatergoria
) {
  try {
    const categoria = await Categoria.findOne({
      where: {
        idCategoria: idCategoria,
        idUsuario: idUsuario,
      },
    });
    categoria.nombCatergoria = nombCatergoria;
    await categoria.save();
    return new CategoriaDTO(
      categoria.idCategoria,
      categoria.idUsuario,
      categoria.nombCatergoria
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

//Eliminar Categoria de un usuario
export async function eliminarCategoria(idCategoria, idUsuario) {
  try {
    await Categoria.destroy({
      where: {
        idCategoria: idCategoria,
        idUsuario: idUsuario,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
