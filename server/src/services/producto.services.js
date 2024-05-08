import { Producto } from "../models/Producto.js";
import { ProductoDTO } from "../dtos/producto.dto.js";

//Crear un Producto
export async function crearProducto(
  codProducto,
  idUsuario,
  idCategoria,
  idProveedor,
  nombProducto,
  precioCompra,
  precioVenta,
  vecimiento
) {
  try {
    const newProducto = await Producto.create({
      codProducto,
      idUsuario,
      idCategoria,
      idProveedor,
      nombProducto,
      precioCompra,
      precioVenta,
      vecimiento,
    });
    return new ProductoDTO(
      newProducto.idProducto,
      newProducto.codProducto,
      newProducto.idUsuario,
      newProducto.idCategoria,
      newProducto.idProveedor,
      newProducto.nombProducto,
      newProducto.precioCompra,
      newProducto.precioVenta,
      newProducto.vecimiento
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

//Obtener Todos los Productos
export async function obtenerProductos(idUsuario) {
  try {
    const productos = await Producto.findAll({
      where: {
        idUsuario: idUsuario,
      },
    });
    return productos.map(
      (productos) =>
        new ProductoDTO(
          productos.idProducto,
          productos.codProducto,
          productos.idUsuario,
          productos.idCategoria,
          productos.idProveedor,
          productos.nombProducto,
          productos.precioCompra,
          productos.precioVenta,
          productos.vecimiento
        )
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

//pendiente obtener el producto con los objetos relacionados
//Obtener un Producto
export async function obtenerProducto(idUsuario, codProducto) {
  try {
    const producto = await Producto.findOne({
      where: {
        idUsuario: idUsuario,
        codProducto: codProducto,
      },
    });
    if (producto) {
      return new ProductoDTO(
        producto.idProducto,
        producto.codProducto,
        producto.idUsuario,
        producto.idCategoria,
        producto.idProveedor,
        producto.nombProducto,
        producto.precioCompra,
        producto.precioVenta,
        producto.vecimiento
      );
    } else {
      // Si no se encontró ningún empleado, devolver null
      return null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

//Actualizar Producto
export async function actualizarProducto(
  codProducto,
  idUsuario,
  idCategoria,
  idProveedor,
  nombProducto,
  precioCompra,
  precioVenta,
  vecimiento
) {
  try {
    const producto = await Producto.findOne({
      where: {
        codProducto: codProducto,
        idUsuario: idUsuario,
      },
    });
    producto.idCategoria = idCategoria;
    producto.idProveedor = idProveedor;
    producto.nombProducto = nombProducto;
    producto.precioCompra = precioCompra;
    producto.precioVenta = precioVenta;
    producto.vecimiento = vecimiento;
    await producto.save();

    return new ProductoDTO(
      producto.idProducto,
      producto.codProducto,
      producto.idUsuario,
      producto.idCategoria,
      producto.idProveedor,
      producto.nombProducto,
      producto.precioCompra,
      producto.precioVenta,
      producto.vecimiento
    );
  } catch (error) {
    throw new Error(error.message);
  }
}

//Eliminar Empleado de un usuario
export async function eliminarProducto(codProducto, idUsuario) {
  try {
    await Producto.destroy({
      where: {
        codProducto: codProducto,
        idUsuario: idUsuario,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
}
