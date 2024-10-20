// configuracion de express | app configurada para utilizarse en el index
import express from 'express';
import cors from 'cors'; // Importa cors
import albumRoutes from './routes/album.routes.js';

const app = express();

// Es importante que el middleware esté antes de las rutas
// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Cambia esto por la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true // Si necesitas enviar cookies o encabezados de autenticación
}));

app.use(express.json()); // Middleware para parsear JSON

// Rutas
app.use(albumRoutes);

export default app;
