import { createContext, useContext, useState } from "react";
import {
    createCategoriaRequest,
    getCategoriasRequest,
    deleteCategoriaRequest,
    updateCategoriaRequest 
} from '../api/Categoria/categoriaAuth';

const CategoriaContext  = createContext();

export const useCategoria = () => {
    const context = useContext(CategoriaContext);
    if(!context){
        throw new Error("useCategoria ya esta usado");
    }
    return context;
}

export function CategoriaProvider({ children }) {
    const [categorias, setCategoria] = useState([]);

    const getCategoria = async () => {
        try {
            const res = await getCategoriasRequest();
            setCategoria(res.data);
        } catch (error) {
            console.log(error)
        }

    }

    const createCategoria = async (categoria) => {
        const res = await createCategoriaRequest(categoria);
        console.log(res);
    }

    const deleteCategoria = async (idCategoria) => {
        try {
          const res = await deleteCategoriaRequest(idCategoria);
          if (res.status == 204) {
            setCategoria(categorias.filter((categoria) => categoria.idCategoria != idCategoria));
          }
        } catch (error) {
          throw error;
        }
      };
      

    const updateCategoria = async (idCategoria, categoria) => {
        try {
            await updateCategoriaRequest(idCategoria, categoria);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <CategoriaContext.Provider value={{
            categorias,
            createCategoria,
            deleteCategoria,
            updateCategoria,
            getCategoria
        }}>
            {children}
        </CategoriaContext.Provider>
    )
}