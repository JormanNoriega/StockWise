export class ProductoDTO {
  constructor(
    idProducto,
    codProducto,
    idUsuario,
    idCategoria,
    idProveedor,
    nombProducto,
    precioCompra,
    precioVenta,
    vecimiento,
    stock 
  ) {
    this.idProducto = idProducto;
    this.codProducto = codProducto;
    this.idUsuario = idUsuario;
    this.idCategoria = idCategoria;
    this.idProveedor = idProveedor;
    this.nombProducto = nombProducto;
    this.precioCompra = precioCompra;
    this.precioVenta = precioVenta;
    this.vecimiento = vecimiento;
    this.stock = stock;
  }
}
