import axios from 'axios';

// Crear instancia de axios con la base URL dinámica
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true, // Habilitar el envío de cookies para autenticación
});

// Interceptor para manejar respuestas globalmente
api.interceptors.response.use(
    (response) => response.data, // Siempre devuelve los datos directamente
    (error) => {
        console.error('Error en la API:', error);
        return Promise.reject(error); // Rechaza para que pueda manejarse en el lugar de la llamada
    }
);

// Funciones para manejar las peticiones
export const getAlbumsRequests = () => api.get("/albums");
export const createAlbumRequest = (album) => api.post("/albums", album);
export const deleteAlbumRequest = (id) => api.delete(`/albums/${id}`);
export const getAlbumDescRequest = (id) => api.get(`/albums/${id}`);
export const updateAlbumRequest = (id, album) => api.put(`/albums/${id}`, album);

