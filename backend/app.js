import express from 'express';
import cors from 'cors'; 
import cookieParser from 'cookie-parser'; 
import authRoutes from './routes/auth.routes.js'; // Asegúrate de que la ruta sea correcta
import albumRoutes from './routes/album.routes.js'; // Asegúrate de que la ruta sea correcta

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Cambia esto por la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));

app.use(express.json()); // Middleware para parsear JSON
app.use(cookieParser()); // Middleware para manejar cookies

// Rutas
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/albums', albumRoutes); // Rutas de álbumes

export default app; // Exporta la app




