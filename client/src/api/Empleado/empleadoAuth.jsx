
import axios from "../axios";

export const getEmpleadosRequest = () => axios.get('/empleados');
export const getEmpleadoRequest = (idEmpleado) => axios.get(`/empleados/${idEmpleado}`);
export const createEmpleadoRequest = (empleado) => axios.post('/empleados', empleado);
export const deleteEmpleadoRequest = (idEmpleado) => axios.put(`/empleados/${idEmpleado}`);
export const updateEmpleadoRequest = (empleado) => axios.delete(`/empleados/${empleado._idEmpleado}`, empleado);