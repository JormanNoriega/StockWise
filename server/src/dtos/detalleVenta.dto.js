export class DetalleVentaDTO {
  constructor(idDetalleVenta, idVenta, idProducto, cantidad, subTotal) {
    this.idDetalleVenta = idVenta;
    this.idVenta = idVenta;
    this.idProducto = idProducto;
    this.cantidad = cantidad;
    this.subTotal = subTotal;
  }
}
