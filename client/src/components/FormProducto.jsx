import React, { useEffect, useState } from "react";
import "../css/component.css";
import Swal from "sweetalert2";
import { useProducto } from "../context/productoContext";
import { useCategoria } from "../context/categoriaContext";
import { useProveedor } from "../context/proveedorContext";
import { format } from "date-fns";

const RegistroProducto = () => {
  const [formData, setFormData] = useState({
    codProducto: "",
    idCategoria: "",
    idProveedor: "",
    nombProducto: "",
    precioCompra: "",
    precioVenta: "",
    vecimiento: "",
    stock: "",
  });
  const [codProducto, setId] = useState("");
  const [editar, setEditar] = useState(false);
  const [error, setError] = useState("");
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterValueProveedor, setFilterValueProveedor] = useState("");
  const [filterValueCategoria, setFilterValueCategoria] = useState("");
  const { 
    createProducto, 
    getProducto, 
    productos, 
    deleteProducto, 
    updateProducto 
  } = useProducto();
  const { getCategoria, categorias } = useCategoria();
  const { getProveedor, proveedores } = useProveedor();

  const handleCreateProducto = async (e) => {
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
        idProveedor: "",
        nombProducto: "",
        precioCompra: "",
        precioVenta: "",
        vecimiento: "",
        stock: "",
      });
      await getProducto();
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

  const handleDeleteProducto = (val) => {
    Swal.fire({
      title: "Confirmar eliminación",
      html: "<i>¿Realmente desea eliminar a <strong>" + val.nombProducto + "</strong>?</i>",
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
              html: "<i>El producto <strong>" + val.nombProducto + "</strong> fue eliminado exitosamente!</i>",
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
        html: "<i>El producto <strong>" + formData.nombProducto + "</strong> fue actualizado con éxito! </i>",
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
      vecimiento: val.vecimiento,
      stock: val.stock,
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
      vecimiento: "",
      stock: "",
    });
    setId("");
    setEditar(false);
  };

  useEffect(() => {
    getProducto();
    getCategoria();
    getProveedor();
  }, []);

  useEffect(() => {
    setFilteredProductos(productos);
  }, [productos]);

  const getCategoriaName = (idCategoria) => {
    const categoria = categorias.find((cat) => cat.idCategoria === idCategoria);
    return categoria ? categoria.nombCatergoria : "Desconocida";
  };

  const getProveedorName = (idProveedor) => {
    const proveedor = proveedores.find((pro) => pro.idProveedor === idProveedor);
    return proveedor ? proveedor.nombProveedor : "Desconocido";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFilterChangeProducto = (e) => {
    const query = e.target.value.toLowerCase();
    setFilterValue(e.target.value);
    setFilteredProductos(
      productos.filter((producto) =>
        producto.nombProducto.toLowerCase().includes(query) ||
        getCategoriaName(producto.idCategoria).toLowerCase().includes(query) ||
        getProveedorName(producto.idProveedor).toLowerCase().includes(query)
      )
    );
  };

  const handleFilterChangeProveedor = (e) => {
    const query = e.target.value.toLowerCase();
    setFilterValueProveedor(e.target.value);
    setFilteredProductos(
      productos.filter((producto) =>
        String(producto.idProveedor).toLowerCase().includes(query)
      )
    );
  };
  
  const handleFilterChangeCategoria = (e) => {
    const query = e.target.value.toLowerCase();
    setFilterValueCategoria(e.target.value);
    setFilteredProductos(
      productos.filter((producto) =>
        String(producto.idCategoria).toLowerCase().includes(query)
      )
    );
  };
  


  const formatFecha = (fecha) => {
    return format(new Date(fecha), "dd/MM/yyyy");
  };

  return (
    <div className="w-full h-full">
      <div className="header-comp">
        <h1 className="title-comp">Registro de Productos</h1>
      </div>
      <div className="form-comp">
        <div className="card">
          <h1 className="sub-titles-copm">Nuevo Producto</h1>
          <form onSubmit={editar ? handleUpdateProducto : handleCreateProducto}>
            <div className="grid-container">
              <div className="grid-item">
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
              <div className="grid-item">
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
              <div className="grid-item">
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
              <div className="grid-item">
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
              <div className="grid-item">
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
              <div className="grid-item">
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
              <div className="grid-item">
                <label htmlFor="vecimiento">Fecha de Vencimiento</label>
                <input
                  type="date"
                  id="vecimiento"
                  name="vecimiento"
                  placeholder="Ingrese la fecha de vencimiento"
                  autoComplete="off"
                  value={formData.vecimiento}
                  onChange={handleChange}
                />
              </div>
              <div className="grid-item">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="Ingrese el stock"
                  autoComplete="off"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn-reg">
                {editar ? "Actualizar" : "Registrar"}
              </button>
              {editar && (
                <button type="button" className="btn-can" onClick={limpiar}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="table-card">
          <h1 className="sub-titles-copm">Productos Registrados</h1>
          <div className="search-bar">
            <input
              type="text"
              id="producto-filter"
              name="producto-filter"
              placeholder="Filtrar productos"
              autoComplete="off"
              value={filterValue}
              onChange={handleFilterChangeProducto}
            />
            <select
              id="proveedor-filter"
              name="proveedor-filter"
              value={filterValueProveedor}
              onChange={handleFilterChangeProveedor}
            >
              <option value="">Seleccione un proveedor</option>
              {proveedores.map((val) => (
                <option key={val.idProveedor} value={val.idProveedor}>
                  {val.nombProveedor}
                </option>
              ))}
            </select>
            <select
              id="categoria-filter"
              name="categoria-filter"
              value={filterValueCategoria}
              onChange={handleFilterChangeCategoria}
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((val) => (
                <option key={val.idCategoria} value={val.idCategoria}>
                  {val.nombCatergoria}
                </option>
              ))}
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Proveedor</th>
                <th>Precio de Compra</th>
                <th>Precio de Venta</th>
                <th>Vencimiento</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((val, key) => {
                return (
                  <tr key={val.idProducto}>
                    <td>{val.codProducto}</td>
                    <td>{val.nombProducto}</td>
                    <td>{getCategoriaName(val.idCategoria)}</td>
                    <td>{getProveedorName(val.idProveedor)}</td>
                    <td>{val.precioCompra}</td>
                    <td>{val.precioVenta}</td>
                    <td>{formatFecha(val.vecimiento)}</td>
                    <td>{val.stock}</td>
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegistroProducto;
