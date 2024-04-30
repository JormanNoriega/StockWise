import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Empleado } from "./Empleado.js";
import { Producto } from "./Producto.js";
import { Categoria } from "./Categoria.js";
import { Proveedor } from "./Proveedor.js";

export const Usuario = sequelize.define(
  "usuarios",
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    correo: {
      type: DataTypes.STRING,
    },
    contraseña: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

//RELACIONES CON EMPLEADOS
Usuario.hasMany(Empleado, {
  foreignKey: "idUsuario",
  sourceKey: "idUsuario",
});

Empleado.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  targetID: "idUsuario",
});


//RELACIONES CON PRODUCTOS
Usuario.hasMany(Producto, {
  foreignKey: "idUsuario",
  targetID: "idUsuario",
});

Producto.belongsTo(Producto, {
  foreignKey: "idUsuario",
  targetID: "idUsuario",
});


//RELACIONES CON CATEGORIAS
Usuario.hasMany(Categoria, {
  foreignKey: "idUsuario",
  targetID: "idUsuario",
});
Categoria.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  targetID: "idUsuario",
});

//RELACIONES CON PROVEEDORES
Usuario.hasMany(Proveedor, {
  foreignKey: "idUsuario",
  targetID: "idUsuario",
});
Proveedor.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  targetID: "idUsuario",
});
