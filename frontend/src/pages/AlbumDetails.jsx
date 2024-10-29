import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlbumDescRequest, deleteAlbumRequest } from '../api/albumes.js';

const AlbumDetails = () => {
  const { id } = useParams(); // Obtiene el ID del álbum desde la URL
  const [album, setAlbum] = useState(null); // Estado para almacenar los detalles del álbum
  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const albumData = await getAlbumDescRequest(id); // No necesitas acceder a "data" porque tu interceptor ya devuelve los datos
        setAlbum(albumData); // Actualiza el estado con los datos del álbum
      } catch (error) {
        console.error('Error al cargar el álbum:', error);
      }
    };

    fetchAlbum(); // Llama a la función para obtener los detalles del álbum
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteAlbumRequest(id); // Llama a la API para eliminar el álbum
      navigate('/'); // Navega a la página principal después de eliminar
    } catch (error) {
      console.error('Error al eliminar el álbum', error);
    }
  };

  if (!album) return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos

  return (
    <div>
      <div>
        <h1>{album.albumName}</h1>
        <p>Artista: {album.artistName}</p>
        <p>Fecha de Lanzamiento: {new Date(album.releaseDate).toLocaleDateString()}</p>
        <p>Género: {album.genre}</p>
        <p>Número de Pistas: {album.trackCount}</p>
      </div>
      <div>
        <h2>Canciones</h2>
        <ul>
          {album.songs && album.songs.map((song, index) => (
            <li key={index}>{song}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleDelete}>Eliminar Álbum</button>
    </div>
  );
};

export default AlbumDetails;
