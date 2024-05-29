import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const DetalleVenta = sequelize.define("detalleVentas", {
  idDetalleVenta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idVenta: {
    type: DataTypes.INTEGER,
  },
  idProducto: {
    type: DataTypes.INTEGER,
  },
  cantidad: {
    type: DataTypes.INTEGER,
  },
  subTotal: {
    type: DataTypes.NUMBER,
  },
});
