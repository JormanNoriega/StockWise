import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Venta } from "./Venta.js";

export const Empleado = sequelize.define(
  "empleados",
  {
    idEmpleado: {
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
    idUsuario: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

//RELACIONES CON VENTA
Empleado.hasMany(Venta, {
  foreignKey: "idEmpleado",
  sourceKey: "idEmpleado",
});

Venta.belongsTo(Empleado, {
  foreignKey: "idEmpleado",
  targetID: "idEmpleado",
});





