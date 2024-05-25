import * as productoService from "../services/producto.services.js";

//Crear un Producto
export const postProducto = async (req, res) => {
  try {
    const idUsuario = req.usuario.idUsuario;
    const {
      codProducto,
      idCategoria,
      idProveedor,
      nombProducto,
      precioCompra,
      precioVenta,
      vecimiento,
      stock 
    } = req.body;
    const newProducto = await productoService.crearProducto(
      codProducto,
      idUsuario,
      idCategoria,
      idProveedor,
      nombProducto,
      precioCompra,
      precioVenta,
      vecimiento,
      stock 
    );
    res.json(newProducto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtener todos los productos
export async function getProductos(req, res) {
  const idUsuario = req.usuario.idUsuario;
  try {
    const productos = await productoService.obtenerProductos(idUsuario);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Obtener un Producto
export async function getProducto(req, res) {
  const idUsuario = req.usuario.idUsuario;
  const { codProducto } = req.params;
  try {
    const producto = await productoService.obtenerProducto(
      idUsuario,
      codProducto
    );
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Actualizar un empleado
export async function putProducto(req, res) {
  const idUsuario = req.usuario.idUsuario;
  const { codProducto } = req.params;
  const {
    idCategoria,
    idProveedor,
    nombProducto,
    precioCompra,
    precioVenta,
    vecimiento,
    stock,
  } = req.body;
  try {
    const productoActualizado = await productoService.actualizarProducto(
      codProducto,
      idUsuario,
      idCategoria,
      idProveedor,
      nombProducto,
      precioCompra,
      precioVenta,
      vecimiento,
      stock 
    );
    res.json(empleadoActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Eliminar un empleado
export async function deleteProducto(req, res) {
  const { codProducto } = req.params;
  const idUsuario = req.usuario.idUsuario;
  try {
    await productoService.eliminarProducto(codProducto, idUsuario);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
