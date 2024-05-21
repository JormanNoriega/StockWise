import { registerRequest, loginRequest, verityTokenRequest } from '../api/auth'
import { loginEmpleadoRequest, verityTokenEmpleadoRequest } from '../api/Empleado/empleadoAuth'
import { createContext, useState, useContext, useEffect } from "react";
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth ya esta usado");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [empleado, setEmpleado] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        const response = await registerRequest(user);
        console.log(response.data);
        setIsAuthenticated(true);
        setUser(response.data);

    }

    const signin = async (user) => {
        try {
            const response = await loginRequest(user);
            console.log(response.data);
            setIsAuthenticated(true);
            setUser(response.data);
            Cookies.set("userType", "user"); // Establece una bandera para usuarios
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
            throw new Error(error.response.data.message || "Error en el inicio de sesión");
        }
    }

    const signine = async (empleado) => {
        try {
            const response = await loginEmpleadoRequest(empleado);
            console.log(response.data);
            setIsAuthenticated(true);
            setEmpleado(response.data);
            Cookies.set("userType", "empleado"); // Establece una bandera para empleados
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
            throw new Error(error.response.data.message || "Error en el inicio de sesión");
        }
    }


    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
        setEmpleado(null);
    }

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verityTokenRequest(cookies.token);
                console.log(res);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }

        async function checkLoginEmpleado() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setEmpleado(null);
            }
            try {
                const res = await verityTokenEmpleadoRequest(cookies.token);
                console.log(res);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setEmpleado(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setEmpleado(null);
                setLoading(false);
            }
        }

        const userType = Cookies.get("userType");

        if (userType === "user") {
            checkLogin();
        } else if (userType === "empleado") {
            checkLoginEmpleado();
        } else {
            setLoading(false);
        }
    }, []);


    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            signine,
            logout,
            loading,
            user,
            empleado,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}