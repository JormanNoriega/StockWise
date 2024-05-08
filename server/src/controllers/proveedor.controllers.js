import * as proveedorService from "../services/proveedor.services.js";

// Crear un Proveedor
export async function postProveedor(req, res) {
  const idUsuario = req.usuario.idUsuario;
  const { nombProveedor, telefono, correo } = req.body;
  try {
    const newProveedor = await proveedorService.crearProveedor(
      idUsuario,
      nombProveedor,
      telefono,
      correo
    );
    res.json(newProveedor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Obtener todos los proveedores
export async function getProveedores(req, res) {
  const idUsuario = req.usuario.idUsuario;
  try {
    const proveedores = await proveedorService.obtenerProveedores(idUsuario);
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Obtener un proveedor
export async function getProveedor(req, res) {
  const idUsuario = req.usuario.idUsuario;
  const { idProveedor } = req.params;
  try {
    const proveedor = await proveedorService.obtenerProveedor(
      idUsuario,
      idProveedor
    );
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Actualizar una Proveedor de un usuario
export async function putProveedor(req, res) {
  const idUsuario = req.usuario.idUsuario;
  const { idProveedor } = req.params;
  const { nombProveedor, telefono, correo } = req.body;
  try {
    const proveedorActualizado = await proveedorService.actualizarProveedor(
      idProveedor,
      idUsuario,
      nombProveedor,
      telefono,
      correo
    );
    res.json(proveedorActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Eliminar una Categoria de un usuario
export async function deleteProveedor(req, res) {
  const idUsuario = req.usuario.idUsuario;
  const { idProveedor } = req.params;
  try {
    await proveedorService.eliminarProveedor(idProveedor, idUsuario);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
