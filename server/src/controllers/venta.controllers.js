import * as ventaService from "../services/venta.services.js";

export const obtenerProductosDelEmpleado = async (req, res) => {
  try {
    const { idEmpleado } = req.body;
    const obtenerProductos = await ventaService.obtenerProductosDelEmpleado(idEmpleado);
    res.json(obtenerProductos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Crear una Venta
export const postVenta = async (req, res) => {
  try {
    const { idEmpleado, detalles } = req.body;
    const newVenta = await ventaService.crearVenta(idEmpleado, detalles);
    res.json(newVenta);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener todas las Ventas
export async function getVentas(req, res) {
  try {
    const ventas = await ventaService.obtenerVentas();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Obtener una Venta
export async function getVenta(req, res) {
  const { idVenta } = req.params;
  try {
    const venta = await ventaService.obtenerVenta(idVenta);
    res.json(venta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
