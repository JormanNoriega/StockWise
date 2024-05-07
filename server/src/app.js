import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
// import cors from "cors";

import usuariosRoutes from "./routes/usuario.routes.js";
import empleadosRoutes from "./routes/empleado.routes.js";

const app = express();

// Middlewares
// app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", usuariosRoutes);
app.use("/api", empleadosRoutes);

export default app;
