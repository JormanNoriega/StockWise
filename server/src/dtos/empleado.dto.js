export class EmpleadoDTO {
  constructor(idEmpleado,nombre, correo, token, contraseña, idUsuario) {
    this.idEmpleado = idEmpleado;
    this.nombre = nombre;
    this.correo = correo;
    this.token = token;
    this.contraseña = contraseña;
    this.idUsuario = idUsuario;
  }
}
