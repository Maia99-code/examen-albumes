import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAlbumRequest } from '../api/albumes.js'; // Asegúrate de importar la función desde el archivo correcto

const CreateAlbum = () => {
  const [albumName, setAlbumName] = useState(''); 
  const [artistName, setArtistName] = useState(''); 
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [trackCount, setTrackCount] = useState(0);
  const [songs, setSongs] = useState([]); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formatear la fecha de lanzamiento
    const formattedReleaseDate = new Date(releaseDate).toISOString().split('T')[0];

    try {
      await createAlbumRequest({ 
        albumName, 
        artistName, 
        releaseDate: formattedReleaseDate, // Usa el formato correcto
        genre, 
        trackCount, 
        songs 
      });
      navigate('/'); // Redirige al home después de crear el álbum
    } catch (error) {
      console.error('Error al crear el álbum', error);
      setError('Error al crear el álbum. Inténtalo nuevamente.'); // Mensaje de error
    }
  };

  return (
    <div>
      <h1>Crear Álbum</h1>
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
            onChange={(e) => setSongs(e.target.value.split(','))} 
          />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CreateAlbum;
