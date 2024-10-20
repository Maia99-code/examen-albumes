import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAlbumesRequests } from '../api/albumes.js'; // Importar la función de API

const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await getAlbumesRequests(); // Usar la función de la API
        console.log(response.data); // Verifica la estructura de los datos
        if (Array.isArray(response.data)) {
          setAlbums(response.data);
        } else {
          console.error("La respuesta no es un array", response.data);
          setError("Error: la respuesta no es un array");
        }
      } catch (error) {
        console.error(error);
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
              <Link to={`/albums/${album._id}`}>Ver</Link>
              <Link to={`/albums/${album._id}/edit`}>Editar</Link>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
