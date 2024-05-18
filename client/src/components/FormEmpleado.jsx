import React, { useEffect, useState } from 'react';
import '../css/FormEmpleado.css';
import Swal from "sweetalert2";
import { useEmpleado } from '../context/empleadoContext';

const RegistroEmpleados = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        contraseña: ""
    });
    const [id, setId] = useState("");
    const [editar, setEditar] = useState(false);
    const [error, setError] = useState('');
    const { createEmpleado, getEmpleado, empleados, deleteEmpleado, updateEmpleado } = useEmpleado();

    const handleCreateEmpleado = async (e) => {
        e.preventDefault();
        try {
            await createEmpleado(formData);
            Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: 'El empleado ha sido registrado correctamente.'
            });
            setFormData({
                nombre: "",
                correo: "",
                contraseña: ""
            });
            await getEmpleado();
        } catch (error) {
            setError(error.response.data.message);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Hubo un problema al registrar al empleado.',
                footer: error
            });
        }
    };

    const handleDeleteEmpleado = (val) => {
        Swal.fire({
            title: "Confirmar eliminación",
            html: "<i>¿Realmente desea eliminar a <strong>" + val.nombre + "</strong>?</i>",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEmpleado(val.idEmpleado)
                    .then(() => {
                        Swal.fire({
                            title: "Registro eliminado!",
                            html: "<i>El empleado <strong>" + val.nombre + "</strong> fue eliminado exitosamente!</i>",
                            icon: 'success',
                        });
                    }).catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "No se puede eliminar el empleado!",
                            footer: '<a href="#">Intente más tarde</a>'
                        });
                    });
            }
        });
    }

    const handleUpdateEmpleado = async (e) => {
        e.preventDefault();
        try {
            await updateEmpleado(id, formData);
            limpiar();
            Swal.fire({
                title: "<strong>Actualización exitosa!</strong>",
                html: "<i>El empleado <strong>" + formData.nombre + "</strong> fue actualizado con éxito! </i>",
                icon: "success",
            });
            await getEmpleado();
        } catch (error) {
            setError(error.response.data.message);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se puede actualizar el empleado!",
                footer: '<a href="#">Intente más tarde</a>'
            });
        }
    };

    const setEmpleado = (val) => {
        setEditar(true);
        setFormData({
            nombre: val.nombre,
            correo: val.correo,
            contraseña: val.contraseña
        });
        setId(val.idEmpleado);
    }

    const limpiar = () => {
        setFormData({
            nombre: "",
            correo: "",
            contraseña: ""
        });
        setId("");
        setEditar(false);
    };

    useEffect(() => {
        getEmpleado();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="w-full h-full">
            <div className="bg-gray-900 text-white py-4 px-6 rounded-t-lg">
                <h1 className="text-3xl font-bold">Registro de Empleados</h1>
            </div>
            <div className="grid grid-cols-1 gap-8 p-6">
                <div className="employee-card">
                    <h2 className="text-2xl font-bold mb-4">Nuevo Empleado</h2>
                    <form className="space-y-4" onSubmit={editar ? handleUpdateEmpleado : handleCreateEmpleado}>
                        <div>
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Ingrese su nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="correo">Correo Electrónico</label>
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                placeholder="usuario@ejemplo.com"
                                value={formData.correo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="contraseña">Contraseña</label>
                            <input
                                type="text"
                                id="contraseña"
                                name="contraseña"
                                placeholder="Ingrese la contraseña"
                                value={formData.contraseña}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            {
                                editar ?
                                    <div>
                                        <button type="submit_2">Actualizar</button>
                                        <button type="button" onClick={limpiar}>Cancelar</button>
                                    </div>
                                    : <button type="submit">Registrar</button>
                            }
                        </div>
                    </form>
                </div>
                <div>
                    <div className="table-card">
                        <h2 className="text-2xl font-bold mb-4">Empleados Registrados</h2>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Correo Electrónico</th>
                                        <th>Contraseña</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        empleados.map((val) => (
                                            <tr key={val.idUsuario}>
                                                <td>{val.nombre}</td>
                                                <td>{val.correo}</td>
                                                <td>{val.contraseña}</td>
                                                <td>
                                                    <button className="edit-button" onClick={() => setEmpleado(val)}>Editar</button>
                                                    <button className="delete-button" onClick={() => handleDeleteEmpleado(val)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistroEmpleados;
