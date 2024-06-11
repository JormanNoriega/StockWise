import React, { useEffect, useState } from "react";
import "../css/component.css";
import Swal from "sweetalert2";
import { useCategoria } from "../context/categoriaContext";

const RegistroCategoria = () => {
  const [formData, setFormData] = useState({
    nombCatergoria: "",
  });
  const [id, setId] = useState("");
  const [editar, setEditar] = useState(false);
  const [filteredCategorias, setFilteredCategorias] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [error, setError] = useState("");
  const {
    createCategoria,
    getCategoria,
    categorias,
    deleteCategoria,
    updateCategoria,
  } = useCategoria();

  const handleCreateCategoria = async (e) => {
    e.preventDefault();
    try {
      await createCategoria(formData);
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "La categoria ha sido registrado correctamente.",
      });
      setFormData({
        nombCatergoria: "",
      });
      await getCategoria();
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

  const handleDeleteCategoria = (val) => {
    Swal.fire({
      title: "Confirmar eliminación",
      html:
        "<i>¿Realmente desea eliminar a <strong>" +
        val.nombCatergoria +
        "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategoria(val.idCategoria)
          .then(() => {
            Swal.fire({
              title: "Registro eliminado!",
              html:
                "<i>La categoria <strong>" +
                val.nombCatergoria +
                "</strong> fue eliminado exitosamente!</i>",
              icon: "success",
            });
            getCategoria();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
              footer: "<a>Intente más tarde</a>",
            });
          });
      }
    });
  };

  const handleUpdateCategoria = async (e) => {
    e.preventDefault();
    try {
      await updateCategoria(id, formData);
      limpiar();
      Swal.fire({
        title: "<strong>Actualización exitosa!</strong>",
        html:
          "<i>La categoria <strong>" +
          formData.nombCatergoria +
          "</strong> fue actualizado con éxito! </i>",
        icon: "success",
      });
      await getCategoria();
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se puede actualizar la categoria!",
        footer: '<a href="#">Intente más tarde</a>',
      });
    }
  };

  const setCategoria = (val) => {
    setEditar(true);
    setFormData({
      nombCatergoria: val.nombCatergoria,
    });
    setId(val.idCategoria);
  };

  const limpiar = () => {
    setFormData({
      nombCatergoria: "",
    });
    setId("");
    setEditar(false);
  };

  useEffect(() => {
    getCategoria();
  }, []);

  useEffect(() => {
    setFilteredCategorias(categorias);
  }, [categorias]);

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
    setFilteredCategorias(
      categorias.filter((categoria) =>
        categoria.nombCatergoria.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="w-full h-full">
      <div className="form-comp">
        <div className="header-comp">
          <h1 className="title-comp">Registro de Categorias</h1>
        </div>
        <div className="card">
          <h1 className="sub-titles-copm">Nueva Categoria</h1>
          <form
            onSubmit={editar ? handleUpdateCategoria : handleCreateCategoria}
          >
            <div className="form-group">
              <label htmlFor="nombCatergoria">Nombre de Categoria</label>
              <input
                type="text"
                id="nombCatergoria"
                name="nombCatergoria"
                placeholder="Ingrese su categoria"
                value={formData.nombCatergoria}
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
          <h1 className="sub-titles-copm">Categorias Registradas</h1>
          <div className="search-bar">
            <input
              type="text"
              id="categoria-filter"
              name="categoria-filter"
              placeholder="Filtrar categorias"
              autoComplete="off"
              value={filterValue}
              onChange={handleFilterChange}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Nombre de Categoria</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategorias.map((val, key) => {
                return (
                  <tr key={val.idCategoria}>
                    <td>{val.nombCatergoria}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => setCategoria(val)}
                      >
                        Editar
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteCategoria(val)}
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

export default RegistroCategoria;
