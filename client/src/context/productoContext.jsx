import { createContext, useContext, useState } from "react";
import { 
    createProductoRequest, 
    getProductoRequest, 
    deleteProductoRequest, 
    updateProductoRequest 
} from '../api/Producto/productoAuth';


const ProductoContext  = createContext();

export const useProducto = () => {
    const context = useContext(ProductoContext);
    if(!context){
        throw new Error("useEmpleado ya esta usado");
    }
    return context;
}

export function ProductoProvider({ children }) {
    const [productos, setProducto] = useState([]);

    const getProducto = async () => {
        try {
            const res = await getProductoRequest();
            setProducto(res.data);
        } catch (error) {
            console.log(error)
        }

    }

    const createProducto = async (producto) => {
        const res = await createProductoRequest(producto);
        console.log(res);
    }

    const deleteProducto = async (codProducto) => {
        try {
            const res = await deleteProductoRequest(codProducto);
            if(res.status == 204) setProducto(
                productos.filter((producto) => producto.codProducto != codProducto))
        } catch (error) {
            throw error;
        }
    }

    const updateProducto = async (codProducto, producto) => {
        try {
            await updateProductoRequest(codProducto, producto);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <ProductoContext.Provider value={{
            productos,
            createProducto,
            deleteProducto,
            updateProducto,
            getProducto
        }}>
            {children}
        </ProductoContext.Provider>
    )
}