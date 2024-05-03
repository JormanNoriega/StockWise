import express from "express";
import usuariosRoutes from "./routes/usuario.routes.js";
import empleadosRoutes from "./routes/empleados.routes.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());


app.use(usuariosRoutes); 
app.use(empleadosRoutes); 

export default app;
