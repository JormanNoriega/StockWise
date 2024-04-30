import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Producto } from "./Producto.js";

export const Proveedor = sequelize.define("proveedores", {
  idProveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idUsuario: {
    type: DataTypes.INTEGER,
  },
  nombProveedor: {
    type: DataTypes.STRING,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  corre: {
    type: DataTypes.STRING,
  },
});

//RELACIONES CON PRODUCTOS
Proveedor.hasMany(Producto,{
  foreignKey: "idProveedor",
  targetID: "idProveedor",
})

Producto.belongsTo(Proveedor, {
  foreignKey: "idProveedor",
  targetID: "idProveedor",
});
