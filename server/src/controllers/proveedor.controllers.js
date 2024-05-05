import * as proveedorService from "../services/proveedor.services.js";

//Obtener todos los Proveedores
export async function getProveedores(req, res) {
  try {
    const proveedores = await proveedorService.obtenerProveedores();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Obtener todos los proveedores de un usuario
export async function getProveedoresDeUsuario(req, res) {
  const { idUsuario } = req.params;
  try {
    const proveedores = await proveedorService.obtenerProveedoresDeUsuario(
      idUsuario
    );
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Obtener un proveedor de un usuario
export async function getProveedorDeUsuario(req, res) {
  const { idUsuario } = req.params;
  const { idProveedor } = req.params;
  try {
    const proveedor = await proveedorService.obtenerProveedorDeUsuario(
      idUsuario,
      idProveedor
    );
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Crear un Proveedor para un usuario
export async function postProveedor(req, res) {
  const { idUsuario } = req.params;
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

// Actualizar una Proveedor de un usuario
export async function putProveedor(req, res) {
  const { idUsuario, idProveedor } = req.params;
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
  const { idProveedor, idUsuario } = req.params;
  try {
    await proveedorService.eliminarProveedor(idProveedor, idUsuario);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
