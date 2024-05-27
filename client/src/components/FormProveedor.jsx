import React, { useEffect, useState } from "react";
import "../css/component.css";
import Swal from "sweetalert2";
import { useProveedor } from "../context/proveedorContext";

const RegistroProveedor = () => {
  const [formData, setFormData] = useState({
    nombProveedor: "",
    telefono: "",
    correo: "",
  });
  const [id, setId] = useState("");
  const [editar, setEditar] = useState(false);
  const [filteredProveedores, setFilteredProveedores] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [error, setError] = useState("");
  const {
    createProveedor,
    getProveedor,
    proveedores,
    deleteProveedor,
    updateProveedor,
  } = useProveedor();

  const handleCreateProveedor = async (e) => {
    e.preventDefault();
    try {
      await createProveedor(formData);
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "El Proveedor ha sido registrado correctamente.",
      });
      setFormData({
        nombProveedor: "",
        telefono: "",
        correo: "",
      });
      await getProveedor();
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: error.response.data.message,
        footer: error.message,
      });
    }
  };

  const handleDeleteProveedor = (val) => {
    Swal.fire({
      title: "Confirmar eliminación",
      html: `<i>¿Realmente desea eliminar a <strong>${val.nombProveedor}</strong>?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProveedor(val.idProveedor)
          .then(() => {
            Swal.fire({
              title: "Registro eliminado!",
              html: `<i>El Proveedor <strong>${val.nombProveedor}</strong> fue eliminado exitosamente!</i>`,
              icon: "success",
            });
            getProveedor();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se puede eliminar el Provedor!",
              footer: '<a href="#">Intente más tarde</a>',
            });
          });
      }
    });
  };

  const handleUpdateProveedor = async (e) => {
    e.preventDefault();
    try {
      await updateProveedor(id, formData);
      limpiar();
      Swal.fire({
        title: "<strong>Actualización exitosa!</strong>",
        html: `<i>El Proveedor <strong>${formData.nombProveedor}</strong> fue actualizado con éxito! </i>`,
        icon: "success",
      });
      await getProveedor();
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se puede actualizar el Proveedor!",
        footer: '<a href="#">Intente más tarde</a>',
      });
    }
  };

  const setProveedor = (val) => {
    setEditar(true);
    setFormData({
      nombProveedor: val.nombProveedor,
      telefono: val.telefono,
      correo: val.correo,
    });
    setId(val.idProveedor);
  };

  const limpiar = () => {
    setFormData({
      nombProveedor: "",
      telefono: "",
      correo: "",
    });
    setId("");
    setEditar(false);
  };

  useEffect(() => {
    getProveedor();
  }, []);

  useEffect(() => {
    setFilteredProveedores(proveedores);
  }, [proveedores]);

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
    setFilteredProveedores(
      proveedores.filter((proveedor) =>
        proveedor.nombProveedor.toLowerCase().includes(query) ||
        proveedor.telefono.toLowerCase().includes(query) ||
        proveedor.correo.toLowerCase().includes(query)
      )
    );
  };


  return (
    <div className="w-full h-full">
      <div className="header-comp">
        <h1 className="title-comp">Registro de Proveedores</h1>
      </div>
      <div className="form-comp">
        <div className="card">
          <h1 className="sub-titles-copm">Nuevo Proveedor</h1>
          <form onSubmit={editar ? handleUpdateProveedor : handleCreateProveedor}>
            <div className="form-group">
              <label htmlFor="nombProveedor">Nombre</label>
              <input
                type="text"
                id="nombProveedor"
                name="nombProveedor"
                placeholder="Ingrese su nombre"
                value={formData.nombProveedor}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Telefono</label>
              <input
                type="number"
                id="telefono"
                name="telefono"
                placeholder="Ingrese su telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="correo">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                name="correo"
                placeholder="Ingrese su correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              {editar ? (
                <div>
                  <button type="submit">Actualizar</button>
                  <button type="button" onClick={limpiar}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <button type="submit">Registrar</button>
              )}
            </div>
          </form>
        </div>
        <div className="table-card">
          <h1 className="sub-titles-copm">Proveedores Registrados</h1>
          <div className="search-bar">
            <input
              type="text"
              id="proveedor-filter"
              name="proveedor-filter"
              placeholder="Filtrar proveedores"
              autoComplete="off"
              value={filterValue}
              onChange={handleFilterChange}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Correo Electrónico</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProveedores.map((val, key) => {
                return (
                  <tr key={val.idProveedor}>
                    <td>{val.nombProveedor}</td>
                    <td>{val.telefono}</td>
                    <td>{val.correo}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => setProveedor(val)}
                      >
                        Editar
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteProveedor(val)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegistroProveedor;
