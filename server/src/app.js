import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import usuariosRoutes from "./routes/usuario.routes.js";
import empleadosRoutes from "./routes/empleado.routes.js";
import categoriasRoutes from "./routes/categoria.routes.js";
import proveedoresRoutes from "./routes/proveedor.routes.js";
import productosRoutes from "./routes/producto.routes.js";
import ventasRoutes from "./routes/venta.routes.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", usuariosRoutes);
app.use("/api", empleadosRoutes);
app.use("/api", categoriasRoutes);
app.use("/api", proveedoresRoutes);
app.use("/api", productosRoutes);
app.use("/api", ventasRoutes);

// Ruta de inicio (opcional)
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

export default app;
