import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Producto } from "./Producto.js";

export const Categoria = sequelize.define("categorias", {
  idCategoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idUsuario: {
    type: DataTypes.INTEGER,
  },
  nombCatergoria: {
    type: DataTypes.STRING,
  },
});

//RELACIONES CON PRODUCTOS
Categoria.hasMany(Producto,{
  foreignKey: "idCategoria",
  targetID: "idCategoria",
})

Producto.belongsTo(Categoria, {
  foreignKey: "idCategoria",
  targetID: "idCategoria",
});
