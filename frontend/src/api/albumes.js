import axios from 'axios';

// Configuración de Axios con base en el entorno
const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api'
});

// Habilitar el envío de cookies para autenticación (si es necesario)
axios.defaults.withCredentials = true;

// Función para manejar la respuesta y errores de las peticiones
const handleResponse = async (promise) => {
    try {
        const response = await promise;
        return response.data; // Solo devuelve los datos
    } catch (error) {
        console.error('Error en la API:', error);
        throw error; // Lanza el error para manejarlo en el lugar de la llamada
    }
};

// Obtener la lista de álbumes
export const getAlbumesRequests = () => handleResponse(api.get("/albums"));

// Crear un álbum
export const createAlbumRequest = (album) => handleResponse(api.post("/albums", album));

// Eliminar un álbum
export const deleteAlbumRequest = (id) => handleResponse(api.delete(`/albums/${id}`));

// Obtener un álbum específico
export const getAlbumDescRequest = (id) => handleResponse(api.get(`/albums/${id}`));

// Actualizar un álbum
export const updateAlbumRequest = (id, album) => handleResponse(api.put(`/albums/${id}`, album));

