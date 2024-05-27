export class EmpleadoDTO {
  constructor(idEmpleado, nombre, correo, contraseña, idUsuario, token) {
    this.idEmpleado = idEmpleado;
    this.nombre = nombre;
    this.correo = correo;
    this.contraseña = contraseña;
    this.idUsuario = idUsuario;
    this.token = token;
  }
}
