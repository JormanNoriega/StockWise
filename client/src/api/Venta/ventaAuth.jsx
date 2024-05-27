import axios from "../axios";

export const createVentaRequest = (Venta) => axios.post('/ventas', Venta);
export const getVentasRequest = () => axios.get('/ventas');
export const getProductosRequest = () => axios.get('/obtenerProductos');
export const getVentaRequest = (idVenta) => axios.get(`/ventas/${idVenta}`);