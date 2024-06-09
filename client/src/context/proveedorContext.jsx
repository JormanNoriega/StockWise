import { createContext, useContext, useState } from "react";
import {
    createProveedorRequest,
    getProveedoresRequest,
    deleteProveedorRequest,
    updateProveedorRequest 
} from '../api/Proveedor/proveedorAuth';

const ProveedorContext  = createContext();

export const useProveedor = () => {
    const context = useContext(ProveedorContext);
    if(!context){
        throw new Error("useProveedor ya esta usado");
    }
    return context;
}

export function ProveedorProvider({ children }) {
    const [proveedores, setProveedor] = useState([]);

    const getProveedor = async () => {
        try {
            const res = await getProveedoresRequest();
            setProveedor(res.data);
        } catch (error) {
            console.log(error)
        }

    }

    const createProveedor = async (proveedor) => {
        const res = await createProveedorRequest(proveedor);
        console.log(res);
    }

    const deleteProveedor = async (idProveedor) => {
        try {
            const res = await deleteProveedorRequest(idProveedor);
            if(res.status == 204) setProveedor(
                proveedores.filter((proveedor) => proveedor.idProveedor != idProveedor))
        } catch (error) {
            throw error;
        }
    }

    const updateProveedor = async (idProveedor, proveedor) => {
        try {
            await updateProveedorRequest(idProveedor, proveedor);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <ProveedorContext.Provider value={{
            proveedores,
            createProveedor,
            deleteProveedor,
            updateProveedor,
            getProveedor
        }}>
            {children}
        </ProveedorContext.Provider>
    )
}