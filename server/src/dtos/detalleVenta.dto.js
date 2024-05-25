export class DetalleVentaDTO {
  constructor(idDetalleVenta, idVenta, idProducto, cantidad, subTotal) {
    this.idDetalleVenta = idDetalleVenta;
    this.idVenta = idVenta;
    this.idProducto = idProducto;
    this.cantidad = cantidad;
    this.subTotal = subTotal;
  }
}
