import React, { useEffect, useState } from 'react';
import '../css/component.css';
import Swal from "sweetalert2";
import { useEmpleado } from '../context/empleadoContext';


const RegistroEmpleados = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        contraseña: ""
      });
      const [error, setError] = useState('');
      const { createEmpleado } = useEmpleado();
      const { getEmpleado, empleados } = useEmpleado();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        createEmpleado(formData);
        try {
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

      useEffect(() => {
        getEmpleado();
      }, [])

    return (
        <div className="w-full h-full">
            <div className="bg-gray-900 text-white py-4 px-6 rounded-t-lg">
                <h1 className="text-3xl font-bold">Registro de Empleados</h1>
            </div>
            <div className="grid grid-cols-1 gap-8 p-6">
                <div className="employee-card"> {/* Aplica la clase para la tarjeta del contexto del empleado */}
                    <h2 className="text-2xl font-bold mb-4">Nuevo Empleado</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" >Nombre</label>
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
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="text"
                                id="correo"
                                name="correo"
                                placeholder="usuario@ejemplo.com"
                                value={formData.correo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña</label>
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
                        <button type="submit">Registrar</button>
                    </form>
                </div>
                <div>
                </div>
                <div>
                    <div className="table-card"> {/* Aplica la clase para la tarjeta de la tabla */}
                        <h2 className="text-2xl font-bold mb-4">Empleados Registrados</h2>
                        <div>
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
                                            empleados.map((val, key) => {
                                                return <tr key={val.idUsuario}>  
                                                <td>{val.nombre}</td>
                                                <td>{val.correo}</td>
                                                <td>{val.contraseña}</td>
                                                <td>
                                                    <button className="edit-button">Editar</button>
                                                    <button className="delete-button">Eliminar</button>
                                                </td>
                                            </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistroEmpleados;
