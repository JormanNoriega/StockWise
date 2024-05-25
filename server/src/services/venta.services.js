import { Venta } from "../models/Venta.js";
import { DetalleVenta } from "../models/DetalleVenta.js";
import { Producto } from "../models/Producto.js";
import { VentaDTO } from "../dtos/venta.dto.js";
import { DetalleVentaDTO } from "../dtos/detalleVenta.dto.js";
import { sequelize } from "../database/database.js";

// Crear una Venta
export async function crearVenta(idEmpleado, detalles) {
  const transaction = await sequelize.transaction();
  try {
    // Calcular el total de la venta
    let totalVenta = 0;
    const detallesCreados = [];

    // Validar stock y calcular subtotal
    for (const detalle of detalles) {
      const producto = await Producto.findByPk(detalle.idProducto, { transaction });

      if (!producto) {
        throw new Error(`Producto con id ${detalle.idProducto} no encontrado`);
      }

      if (producto.stock < detalle.cantidad) {
        throw new Error(`Stock insuficiente para el producto con id ${detalle.idProducto}`);
      }

      const subTotal = detalle.cantidad * producto.precioVenta;
      totalVenta += subTotal;

      detallesCreados.push({
        idProducto: detalle.idProducto,
        cantidad: detalle.cantidad,
        subTotal: subTotal,
      });
    }

    // Crear la venta
    const newVenta = await Venta.create({
      idEmpleado,
      totalVenta,
    }, { transaction });

    // Crear los detalles de la venta y actualizar el inventario
    for (const detalle of detallesCreados) {
      await DetalleVenta.create({
        idVenta: newVenta.idVenta,
        idProducto: detalle.idProducto,
        cantidad: detalle.cantidad,
        subTotal: detalle.subTotal,
      }, { transaction });

      // Actualizar el inventario restando la cantidad vendida
      const producto = await Producto.findByPk(detalle.idProducto, { transaction });
      producto.stock -= detalle.cantidad;
      await producto.save({ transaction });
    }

    // Commit de la transacción
    await transaction.commit();

    return new VentaDTO(
      newVenta.idVenta,
      newVenta.idEmpleado,
      newVenta.totalVenta,
      newVenta.fechaVenta,
      detallesCreados.map((detalle) => 
        new DetalleVentaDTO(
          detalle.idDetalleVenta,
          newVenta.idVenta,
          detalle.idProducto,
          detalle.cantidad,
          detalle.subTotal
        )
      )
    );
  } catch (error) {
    // Rollback de la transacción en caso de error
    await transaction.rollback();
    throw new Error(error.message);
  }
}

// Obtener todas las Ventas
export async function obtenerVentas() {
  try {
    const ventas = await Venta.findAll({
      include: DetalleVenta,
    });

    return ventas.map((venta) => {
      // Asegúrate de que `detalleVentas` no es undefined
      const detalles = venta.detalleVentas || [];

      return new VentaDTO(
        venta.idVenta,
        venta.idEmpleado,
        venta.totalVenta,
        venta.fechaVenta,
        detalles.map((detalle) => {
          return new DetalleVentaDTO(
            detalle.idDetalleVenta,
            detalle.idVenta,
            detalle.idProducto,
            detalle.cantidad,
            detalle.subTotal
          );
        })
      );
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

// Obtener una Venta por ID
export async function obtenerVenta(idVenta) {
  try {
    const venta = await Venta.findOne({
      where: { idVenta },
      include: DetalleVenta,
    });

    if (!venta) {
      throw new Error(`Venta con ID ${idVenta} no encontrada`);
    }

    // Asegúrate de que `detalleVentas` no es undefined
    const detalles = venta.detalleVentas || [];

    return new VentaDTO(
      venta.idVenta,
      venta.idEmpleado,
      venta.totalVenta,
      venta.fechaVenta,
      detalles.map((detalle) => {
        return new DetalleVentaDTO(
          detalle.idDetalleVenta,
          detalle.idVenta,
          detalle.idProducto,
          detalle.cantidad,
          detalle.subTotal
        );
      })
    );
  } catch (error) {
    throw new Error(error.message);
  }
}
