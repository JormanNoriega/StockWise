import axios from "../axios";

export const getProveedoresRequest = () => axios.get('/proveedores');
export const getProveedorRequest = (idProveedor) => axios.get(`/proveedores/${idProveedor}`);
export const createProveedorRequest = (proveedor) => axios.post('/proveedores', proveedor);
export const deleteProveedorRequest = (idProveedor) => axios.delete(`/proveedores/${idProveedor}`);
export const updateProveedorRequest = (idProveedor,proveedor) => axios.put(`/proveedores/${idProveedor}`, proveedor);