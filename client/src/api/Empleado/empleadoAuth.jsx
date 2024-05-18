
import axios from "../axios";

export const getEmpleadosRequest = () => axios.get('/empleados');
export const getEmpleadoRequest = (idEmpleado) => axios.get(`/empleados/${idEmpleado}`);
export const createEmpleadoRequest = (empleado) => axios.post('/empleados', empleado);
export const deleteEmpleadoRequest = (idEmpleado) => axios.delete(`/empleados/${idEmpleado}`);
export const updateEmpleadoRequest = (idEmpleado,empleado) => axios.put(`/empleados/${idEmpleado}`, empleado);