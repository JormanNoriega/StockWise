export class VentaDTO {
  constructor(idVenta, idEmpleado, totalVenta, fechaVenta, detalles) {
    this.idVenta = idVenta;
    this.idEmpleado = idEmpleado;
    this.totalVenta = totalVenta;
    this.fechaVenta = fechaVenta;
    this.detallesVenta = detalles; // Array de DetalleVentaDTO
  }
}
