import React, { useEffect, useState } from "react";
import "../css/component.css";
import Swal from "sweetalert2";
import { useProducto } from "../context/productoContext";
import { useCategoria } from "../context/categoriaContext";
import { useProveedor } from "../context/proveedorContext";

const RegistroProducto = () => {
  const [formData, setFormData] = useState({
    codProducto: "",
    idCategoria: "",
    nombCatergoria: "",
    idProveedor: "",
    nombProveedor: "",
    nombProducto: "",
    precioCompra: "",
    precioVenta: "",
    vecimiento: ""
  });
  const [codProducto, setId] = useState("");
  const [editar, setEditar] = useState(false);
  const [error, setError] = useState("");
  const {
    createProducto,
    getProducto,
    productos,
    deleteProducto,
    updateProducto,
  } = useProducto();
  const {
    getCategoria,
    categorias,
  } = useCategoria();
  const {
    getProveedor,
    proveedores,
  } = useProveedor();

  const handleCreateEmpleado = async (e) => {
    e.preventDefault();
    try {
      await createProducto(formData);
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "El producto ha sido registrado correctamente.",
      });
      setFormData({
        codProducto: "",
        idCategoria: "",
        nombCatergoria: "",
        idProveedor: "",
        nombProveedor: "",
        nombProducto: "",
        precioCompra: "",
        precioVenta: "",
        vecimiento: ""
      });
      await getProducto();
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Hubo un problema al registrar el producto.",
        footer: error,
      });
    }
  };

  const handleDeleteProducto = (val) => {
    Swal.fire({
      title: "Confirmar eliminación",
      html:
        "<i>¿Realmente desea eliminar a <strong>" +
        val.nombProducto +
        "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProducto(val.codProducto)
          .then(() => {
            Swal.fire({
              title: "Registro eliminado!",
              html:
                "<i>El producto <strong>" +
                val.nombProducto +
                "</strong> fue eliminado exitosamente!</i>",
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se puede eliminar el producto!",
              footer: '<a href="#">Intente más tarde</a>',
            });
          });
      }
    });
  };

  const handleUpdateProducto = async (e) => {
    e.preventDefault();
    try {
      await updateProducto(codProducto, formData);
      limpiar();
      Swal.fire({
        title: "<strong>Actualización exitosa!</strong>",
        html:
          "<i>El producto <strong>" +
          formData.nombProducto +
          "</strong> fue actualizado con éxito! </i>",
        icon: "success",
      });
      await getProducto();
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se puede actualizar el producto!",
        footer: '<a href="#">Intente más tarde</a>',
      });
    }
  };

  const setProducto = (val) => {
    setEditar(true);
    setFormData({
      codProducto: val.codProducto,
      idCategoria: val.idCategoria,
      idProveedor: val.idProveedor,
      nombProducto: val.nombProducto,
      precioCompra: val.precioCompra,
      precioVenta: val.precioVenta,
      vecimiento: val.vecimiento
    });
    setId(val.codProducto);
  };

  const limpiar = () => {
    setFormData({
      codProducto: "",
      idCategoria: "",
      idProveedor: "",
      nombProducto: "",
      precioCompra: "",
      precioVenta: "",
      vecimiento: ""
    });
    setId("");
    setEditar(false);
  };

  useEffect(() => {
    getProducto();
    getCategoria();
    getProveedor();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-full">
      <div className="header-comp">
        <h1 className="title-comp">Registro de Productos</h1>
      </div>
      <div className="form-comp">
        <div className="card">
          <h1 className="sub-titles-comp">Nuevo Producto</h1>
          <form onSubmit={editar ? handleUpdateProducto : handleCreateEmpleado} className="form-grid">
            <div className="form-group">
              <label htmlFor="codProducto">Código de Producto</label>
              <input
                type="text"
                id="codProducto"
                name="codProducto"
                placeholder="Ingrese el código de producto"
                autoComplete="off"
                value={formData.codProducto}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="idCategoria">Categoría</label>
              <select
                id="idCategoria"
                name="idCategoria"
                value={formData.idCategoria}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((val) => (
                  <option key={val.idCategoria} value={val.idCategoria}>
                    {val.nombCatergoria}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="idProveedor">Proveedor</label>
              <select
                id="idProveedor"
                name="idProveedor"
                value={formData.idProveedor}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un proveedor</option>
                {proveedores.map((val) => (
                  <option key={val.idProveedor} value={val.idProveedor}>
                    {val.nombProveedor}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="nombProducto">Nombre del Producto</label>
              <input
                type="text"
                id="nombProducto"
                name="nombProducto"
                placeholder="Ingrese el nombre del producto"
                autoComplete="off"
                value={formData.nombProducto}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="precioCompra">Precio de Compra</label>
              <input
                type="number"
                id="precioCompra"
                name="precioCompra"
                placeholder="Ingrese el precio de compra"
                autoComplete="off"
                value={formData.precioCompra}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="precioVenta">Precio de Venta</label>
              <input
                type="number"
                id="precioVenta"
                name="precioVenta"
                placeholder="Ingrese el precio de venta"
                autoComplete="off"
                value={formData.precioVenta}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="vecimiento">Fecha de Vencimiento</label>
              <input
                type="date"
                id="vecimiento"
                name="vecimiento"
                placeholder="Ingrese la fecha de vencimiento"
                autoComplete="off"
                value={formData.vecimiento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              {editar ? (
                <div>
                  <button type="submit_2">Actualizar</button>
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
        <div className="table-container">
          <h2 className="sub-titles-comp">Productos Registrados</h2>
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Categoria</th>
                  <th>Proveedor</th>
                  <th>Precio de compra</th>
                  <th>Precio de venta</th>
                  <th>Vencimiento</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((val) => (
                  <tr key={val.idUsuario}>
                    <td>{val.codProducto}</td>
                    <td>{val.nombProducto}</td>
                    <td>{val.idCategoria}</td>
                    <td>{val.idProveedor}</td>
                    <td>{val.precioCompra}</td>
                    <td>{val.precioVenta}</td>
                    <td>{val.vecimiento}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => setProducto(val)}
                      >
                        Editar
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteProducto(val)}
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
    </div>
  );
};

export default RegistroProducto;
