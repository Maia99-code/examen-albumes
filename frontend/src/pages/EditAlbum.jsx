import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlbumDescRequest, updateAlbumRequest } from '../api/albumes.js';

const EditAlbum = () => {
  const { id } = useParams();
  const [albumName, setAlbumName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [trackCount, setTrackCount] = useState(0);
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await getAlbumDescRequest(id);
        const { albumName, artistName, releaseDate, genre, trackCount, songs } = response.data;
        setAlbumName(albumName);
        setArtistName(artistName);
        setReleaseDate(releaseDate.substring(0, 10)); // Formato correcto: "yyyy-MM-dd"
        setGenre(genre);
        setTrackCount(trackCount);
        setSongs(songs || []);
      } catch (error) {
        console.error('Error al obtener el álbum:', error);
        setError('Error al cargar el álbum. Inténtalo nuevamente.');
      }
    };
    fetchAlbum();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAlbumRequest(id, { 
        albumName, 
        artistName, 
        releaseDate, 
        genre, 
        trackCount, 
        songs 
      });
      navigate(`/albums/${id}`);
    } catch (error) {
      console.error('Error al editar el álbum', error);
      setError('Error al editar el álbum. Inténtalo nuevamente.');
    }
  };

  if (!albumName) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Editar Álbum</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input 
            type="text" 
            value={albumName} 
            onChange={(e) => setAlbumName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Artista:</label>
          <input 
            type="text" 
            value={artistName} 
            onChange={(e) => setArtistName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Fecha de Lanzamiento:</label>
          <input 
            type="date" 
            value={releaseDate} 
            onChange={(e) => setReleaseDate(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Género:</label>
          <input 
            type="text" 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Número de Pistas:</label>
          <input 
            type="number" 
            value={trackCount} 
            onChange={(e) => setTrackCount(Number(e.target.value))} 
            min="1" 
            required 
          />
        </div>
        <div>
          <label>Canciones:</label>
          <input 
            type="text" 
            placeholder="Ingrese canciones separadas por comas" 
            value={songs.join(', ')} 
            onChange={(e) => setSongs(e.target.value.split(','))} 
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditAlbum;
