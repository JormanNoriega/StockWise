import React, { useEffect, useState } from "react";
import "../css/component.css";
import Swal from "sweetalert2";
import { useEmpleado } from "../context/empleadoContext";

const RegistroEmpleados = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });
  const [id, setId] = useState("");
  const [editar, setEditar] = useState(false);
  const [filteredEmpleados, setFilteredEmpleados] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [error, setError] = useState("");
  const {
    createEmpleado,
    getEmpleado,
    empleados,
    deleteEmpleado,
    updateEmpleado,
  } = useEmpleado();

  const handleCreateEmpleado = async (e) => {
    e.preventDefault();
    try {
      await createEmpleado(formData);
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "El empleado ha sido registrado correctamente.",
      });
      setFormData({
        nombre: "",
        correo: "",
        contraseña: "",
      });
      await getEmpleado();
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: error.response.data.message,
        footer: error,
      });
    }
  };

  const handleDeleteEmpleado = (val) => {
    Swal.fire({
      title: "Confirmar eliminación",
      html:
        "<i>¿Realmente desea eliminar a <strong>" +
        val.nombre +
        "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmpleado(val.idEmpleado)
          .then(() => {
            Swal.fire({
              title: "Registro eliminado!",
              html:
                "<i>El empleado <strong>" +
                val.nombre +
                "</strong> fue eliminado exitosamente!</i>",
              icon: "success",
            });
            getEmpleado();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
              footer: '<a>Intente más tarde</a>',
            });
          });
      }
    });
  };

  const handleUpdateEmpleado = async (e) => {
    e.preventDefault();
    try {
      await updateEmpleado(id, formData);
      limpiar();
      Swal.fire({
        title: "<strong>Actualización exitosa!</strong>",
        html:
          "<i>El empleado <strong>" +
          formData.nombre +
          "</strong> fue actualizado con éxito! </i>",
        icon: "success",
      });
      await getEmpleado();
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se puede actualizar el empleado!",
        footer: '<a href="#">Intente más tarde</a>',
      });
    }
  };

  const setEmpleado = (val) => {
    setEditar(true);
    setFormData({
      nombre: val.nombre,
      correo: val.correo,
      contraseña: val.contraseña,
    });
    setId(val.idEmpleado);
  };

  const limpiar = () => {
    setFormData({
      nombre: "",
      correo: "",
      contraseña: "",
    });
    setId("");
    setEditar(false);
  };

  useEffect(() => {
    getEmpleado();
  }, []);

  useEffect(() => {
    setFilteredEmpleados(empleados);
  }, [empleados]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFilterChange = (e) => {
    const query = e.target.value.toLowerCase();
    setFilterValue(e.target.value);
    setFilteredEmpleados(
      empleados.filter(
        (empleado) =>
          empleado.nombre.toLowerCase().includes(query) ||
          empleado.correo.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="w-full h-full">
      <div className="header-comp">
        <h1 className="title-comp">Registro de Empleados</h1>
      </div>
      <div className="form-comp">
        <div className="card">
          <h1 className="sub-titles-copm">Nuevo Empleado</h1>
          <form onSubmit={editar ? handleUpdateEmpleado : handleCreateEmpleado}>
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ingrese su nombre"
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
                value={formData.contraseña}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button type={editar ? "submit_2" : "submit"}>
                {editar ? "Actualizar" : "Registrar"}
              </button>
              {editar && (
                <button type="button" onClick={limpiar}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="table-card">
          <h1 className="sub-titles-copm">Empleados Registrados</h1>
          <div className="search-bar">
            <input
              type="text"
              id="empleado-filter"
              name="empleado-filter"
              placeholder="Filtrar empleados"
              autoComplete="off"
              value={filterValue}
              onChange={handleFilterChange}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>ID Empleado</th>
                <th>Nombre</th>
                <th>Correo Electrónico</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmpleados.map((val) => (
                <tr key={val.idEmpleado}>
                  <td>{val.idEmpleado}</td>
                  <td>{val.nombre}</td>
                  <td>{val.correo}</td>

                  <td>
                    <button
                      className="edit-button"
                      onClick={() => setEmpleado(val)}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteEmpleado(val)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegistroEmpleados;
