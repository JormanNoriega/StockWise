import express from "express";
import usuariosRoutes from "./routes/usuario.routes.js";
import empleadosRoutes from "./routes/empleado.routes.js";
import categoriasRoutes from "./routes/categoria.routes.js";
import proveedoresRoutes from "./routes/proveedor.routes.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());


app.use("/api",usuariosRoutes); 
app.use(empleadosRoutes); 
app.use(categoriasRoutes); 
app.use(proveedoresRoutes); 

export default app;
