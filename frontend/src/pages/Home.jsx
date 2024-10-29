import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAlbumsRequests } from '../api/albumes.js'; // Cambia 'getAlbumesRequests' a 'getAlbumsRequests'

const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albumsData = await getAlbumsRequests(); // Llama a la función correcta
        setAlbums(albumsData); // Actualiza el estado con los datos del álbum
      } catch (error) {
        console.error('Error al cargar los álbumes:', error);
        setError("Error al cargar los álbumes");
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div>
      <h1>Todos los Álbumes</h1>
      {error && <p>{error}</p>} {/* Muestra el mensaje de error si hay uno */}
      <Link to="/create">Crear Álbum</Link>
      {albums.length === 0 ? ( // Verifica si hay álbumes
        <p>Aún no hay álbumes creados.</p>
      ) : (
        <ul>
          {albums.map(album => (
            <li key={album._id}>
              {album.albumName} - {album.artistName}
              <Link to={`/album/${album._id}`}>Ver</Link>
              <Link to={`/album/${album._id}/edit`}>Editar</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
