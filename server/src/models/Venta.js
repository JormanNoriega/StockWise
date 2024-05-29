import { DataTypes, HasMany } from "sequelize";
import { sequelize } from "../database/database.js";
import { DetalleVenta } from "./DetalleVenta.js";

export const Venta = sequelize.define("ventas", {
  idVenta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idEmpleado: {
    type: DataTypes.INTEGER,
  },
  totalVenta: {
    type: DataTypes.NUMBER,
  },
  fechaVenta: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

//RELACION CON DETALLE VENTA
Venta.hasMany(DetalleVenta, {
  foreignKey: "idVenta",
  sourceKey: "idVenta",
});

DetalleVenta.belongsTo(Venta, {
  foreignKey: "idVenta",
  targetID: "idVenta",
});
