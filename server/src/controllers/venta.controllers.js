import * as ventaService from "../services/venta.services.js";

// Crear una Venta
export const postVenta = async (req, res) => {
  try {
    const idEmpleado = req.usuario.idEmpleado;
    const { detalles } = req.body;
    const newVenta = await ventaService.crearVenta(idEmpleado, detalles);
    res.json(newVenta);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener todas las Ventas
export async function getVentas(req, res) {
  try {
    const idUsuario = req.usuario.idUsuario;
    const ventas = await ventaService.obtenerVentas(idUsuario);
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Obtener una Venta
export async function getVenta(req, res) {
  const idUsuario = req.usuario.idUsuario;
  const { idVenta } = req.params;
  try {
    const venta = await ventaService.obtenerVenta(idVenta, idUsuario);
    res.json(venta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
