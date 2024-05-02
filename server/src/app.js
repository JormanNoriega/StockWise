import express from "express";
import usuariosRoutes from "./routes/usuario.routes.js";
import empleadosRoutes from "./routes/empleados.routes.js";

const app = express();

// Middlewares
app.use(express.json());

app.use(usuariosRoutes); 
app.use(empleadosRoutes); 

export default app;
