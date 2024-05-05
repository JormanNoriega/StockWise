import { Categoria } from "../models/Categoria.js";
import { CategoriaDTO } from "../dtos/categoria.dto.js";

//obtener Todas las categorias
export async function obtenerCategorias() {
  try {
    const categoria = await Categoria.findAll({
      attributes: ["idCategoria", "idUsuario", "nombCatergoria"],
    });
    return categoria.map(
      (categoria) =>
        new CategoriaDTO(
          categoria.idCategoria,
          categoria.idUsuario,
          categoria.nombCatergoria
        )
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

//Obtener Todas las Categorias de un usuario
export async function obtenerCategoriasDeUsuario(idUsuario) {
  try {
    const categoria = await Categoria.findAll({
      where: {
        idUsuario: idUsuario,
      },
    });
    return categoria.map(
      (categoria) =>
        new CategoriaDTO(
          categoria.idCategoria,
          categoria.idUsuario,
          categoria.nombCatergoria
        )
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

//Obtener una Categora de un usuario
export async function obtenerCategoriaDeUsuario(idUsuario, idCategoria) {
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
        categoria.nombCatergoria,
      );
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

//Crear Categoria a un Usuario
export async function crearCategoria(idUsuario, nombCatergoria) {
  try {
    const newCategoria = await Categoria.create({
      idUsuario,
      nombCatergoria,
    });
    return new CategoriaDTO(
      newCategoria.idCategoria,
      newCategoria.idEmpleado,
      newCategoria.nombre
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

//Actualizar Categoria de un Usuario
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
