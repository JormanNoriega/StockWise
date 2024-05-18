import { createContext, useContext, useState } from "react";
import { 
    createEmpleadoRequest, 
    getEmpleadosRequest, 
    deleteEmpleadoRequest, 
    updateEmpleadoRequest 
} from '../api/Empleado/empleadoAuth';


const EmpleadoContext  = createContext();

export const useEmpleado = () => {
    const context = useContext(EmpleadoContext);
    if(!context){
        throw new Error("useEmpleado ya esta usado");
    }
    return context;
}

export function EmpleadoProvider({ children }) {
    const [empleados, setEmpleado] = useState([]);

    const getEmpleado = async () => {
        try {
            const res = await getEmpleadosRequest();
            setEmpleado(res.data);
        } catch (error) {
            console.log(error)
        }

    }

    const createEmpleado = async (empleado) => {
        const res = await createEmpleadoRequest(empleado);
        console.log(res);
    }

    const deleteEmpleado = async (idEmpleado) => {
        try {
            const res = await deleteEmpleadoRequest(idEmpleado);
            if(res.status == 204) setEmpleado(
                empleados.filter((empleado) => empleado.idEmpleado != idEmpleado))
        } catch (error) {
            console.log(error);
        }
    }

    const updateEmpleado = async (idEmpleado, empleado) => {
        try {
            await updateEmpleadoRequest(idEmpleado, empleado);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <EmpleadoContext.Provider value={{
            empleados,
            createEmpleado,
            deleteEmpleado,
            updateEmpleado,
            getEmpleado
        }}>
            {children}
        </EmpleadoContext.Provider>
    )
}