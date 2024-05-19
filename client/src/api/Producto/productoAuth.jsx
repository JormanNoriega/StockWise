import axios from "../axios";

export const getProductoRequest = () => axios.get('/productos');
export const getProductosRequest = (codProducto) => axios.get(`/productos/${codProducto}`);
export const createProductoRequest = (Producto) => axios.post('/productos', Producto);
export const deleteProductoRequest = (codProducto) => axios.delete(`/productos/${codProducto}`);
export const updateProductoRequest = (codProducto,Producto) => axios.put(`/productos/${codProducto}`, Producto);