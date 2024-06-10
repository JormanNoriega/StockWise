import React, { useEffect, useState } from "react";
import "../css/component.css";
import Swal from "sweetalert2";
import { useProducto } from "../context/productoContext";
import { useVenta } from "../context/ventaContext";
import { format } from "date-fns";

const RegistroVenta = () => {
  const [formData, setFormData] = useState({
    idProducto: "",
    codProducto: "",
    nombProducto: "",
    nombCatergoria: "",
    precioVenta: "",
    cantidad: "",
    stock: "",
    fechaVenta: "",
  });
  const [carrito, setCarrito] = useState([]);
  const [totalVenta, setTotalVenta] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const { createVenta, getVentas, ventas } = useVenta();
  const { productos, getProducto } = useProducto();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "El carrito está vacío. Por favor, agregue productos antes de registrar la venta.",
      });
      return;
    }

    const venta = {
      fechaVenta: formData.fechaVenta,
      detalles: carrito.map(producto => ({
        idProducto: producto.idProducto,
        cantidad: producto.cantidad,
        precioVenta: producto.precioVenta,
        subTotal: producto.subTotal,
      })),
    };

    try {
      await createVenta(venta);
      Swal.fire({
        icon: "success",
        title: "¡Venta registrada!",
        text: "La venta ha sido registrada correctamente.",
      });
      setCarrito([]);
      setTotalVenta(0);
      setFormData({
        idProducto: "",
        nombProducto: "",
        precioVenta: "",
        cantidad: "",
        stock: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: error.response.data.message,
        footer: error.message,
      });
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "precioVenta" || name === "cantidad") {
      calcularSubtotal(name, value);
    }
  };

  useEffect(() => {
    getProducto();
    getVentas();
  }, []);

  const handleProductCodeEnter = (e) => {
    if (e.key === "Enter") {
      const producto = productos.find(p => p.codProducto === formData.codProducto);
      if (producto) {
        setFormData(prevState => ({
          ...prevState,
          idProducto: producto.idProducto,
          codProducto: producto.codProducto,
          nombProducto: producto.nombProducto,
          precioVenta: producto.precioVenta,
          stock: producto.stock,
        }));
      } else {
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Producto no encontrado 2",
        });
      }
    }
  };

  const agregarProducto = () => {
    const producto = productos.find(p => p.codProducto === formData.codProducto);
    if (!producto) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Producto no encontrado",
      });
      return;
    }
    const cantidad = parseFloat(formData.cantidad);
    if (!formData.precioVenta || !formData.cantidad || formData.cantidad <= 0 || formData.precioVenta <= 0) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "El precio de venta y la cantidad deben ser mayores a 0.",
      });
      return;
    }

      if (cantidad > formData.stock) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "No hay suficiente stock disponible.",
      });
      return;
    }

    const nuevoProducto = {
      ...formData,
      nombProducto: producto.nombProducto,
      subTotal: subtotal,
    };

    setCarrito([...carrito, nuevoProducto]);
    setTotalVenta(prevTotal => prevTotal + parseFloat(subtotal));
    limpiar();
  };

  const eliminarProducto = (index) => {
    const producto = carrito[index];
    setCarrito(carrito.filter((_, i) => i !== index));
    setTotalVenta(prevTotal => prevTotal - parseFloat(producto.subTotal));
  };

  const calcularSubtotal = (name, value) => {
    const precio = name === "precioVenta" ? parseFloat(value) : parseFloat(formData.precioVenta);
    const cantidad = name === "cantidad" ? parseFloat(value) : parseFloat(formData.cantidad);
    const nuevoSubtotal = precio * cantidad;
    setSubtotal(nuevoSubtotal.toFixed(2));
  };

  const limpiar = () => {
    setFormData({
      codProducto: "",
      nombProducto: "",
      precioVenta: "",
      cantidad: "",
      fechaVenta: formData.fechaVenta,
    });
    setSubtotal(0);
  };

  return (
    <div className="w-full h-full">
      <div className="header-comp">
        <h1 className="title-comp">Registro de ventas</h1>
      </div>
      <div className="form-comp">
        <div className="card">
          <h1 className="sub-titles-copm">Nueva venta</h1>
          <div className="grid-container">
            <div className="grid-item">
              <label htmlFor="codProducto">Código del producto</label>
              <input
                type="text"
                id="codProducto"
                name="codProducto"
                placeholder="Ingrese el código del producto"
                autoComplete="off"
                value={formData.codProducto}
                onChange={handleChange}
                onKeyDown={handleProductCodeEnter}
                required
              />
            </div>
            <div className="grid-item">
              <label htmlFor="nombProducto">Nombre del producto</label>
              <input
                type="text"
                id="nombProducto"
                name="nombProducto"
                placeholder="Ingrese el nombre del producto"
                autoComplete="off"
                value={formData.nombProducto}
                onChange={handleChange}
                required
                readOnly
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
                readOnly
              />
            </div>
            <div className="grid-item">
              <label htmlFor="cantidad">Cantidad</label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                placeholder="Ingrese la cantidad"
                autoComplete="off"
                value={formData.cantidad}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid-item">
              <label htmlFor="subtotal">Subtotal</label>
              <input
                type="text"
                id="subtotal"
                name="subtotal"
                value={subtotal}
                readOnly
              />
            </div>
            <div>
              <button type="button-venta" onClick={agregarProducto}>
                Agregar Producto
              </button>
            </div>
          </div>
        </div>
        <div className="table-card">
          <h1 className="sub-titles-copm">Carrito de productos</h1>
          <div>
            <table>
              <thead >
                <tr>
                  <th>Producto</th>
                  <th>Precio de Venta</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.nombProducto}</td>
                    <td>{producto.precioVenta}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.subTotal}</td>
                    <td>
                      <button
                        className="delete-button"
                      onClick={() => eliminarProducto(index)} >Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-venta">
              <h3>Total Venta: {totalVenta.toFixed(2)}</h3>
            </div>
            <div>
              <button type="button-registrar-venta" onClick={handleSubmit}>
                Registrar Venta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroVenta;
