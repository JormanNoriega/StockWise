// Cargar dotenv para acceder a las variables de entorno
import dotenv from 'dotenv';

// Inicializa dotenv para leer el archivo .env
dotenv.config();  

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";