import { createContext, useContext, useState } from "react";
import { createEmpleadoRequest, getEmpleadosRequest } from '../api/Empleado/empleadoAuth';


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

    return(
        <EmpleadoContext.Provider value={{
            empleados,
            createEmpleado,
            getEmpleado
        }}>
            {children}
        </EmpleadoContext.Provider>
    )
}