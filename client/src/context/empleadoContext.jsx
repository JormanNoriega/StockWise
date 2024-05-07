import { createContext, useContext, useState } from "react";
import { createEmpleadoRequest } from '../api/Empleado/empleadoAuth';


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

    const createEmpleado = async (empleado) => {
        const res = await createEmpleadoRequest(empleado);
        console.log(empleado);
    }

    return(
        <EmpleadoContext.Provider value={{
            empleados,
            createEmpleado
        }}>
            {children}
        </EmpleadoContext.Provider>
    )
}