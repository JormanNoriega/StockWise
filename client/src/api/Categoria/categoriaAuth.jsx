import axios from "../axios";

export const getCategoriasRequest = () => axios.get('/categorias');
export const getCategoriaRequest = (idCategoria) => axios.get(`/categorias/${idCategoria}`);
export const createCategoriaRequest = (categoria) => axios.post('/categorias', categoria);
export const deleteCategoriaRequest = (idCategoria) => axios.delete(`/categorias/${idCategoria}`);
export const updateCategoriaRequest = (idCategoria,categoria) => axios.put(`/categorias/${idCategoria}`, categoria);