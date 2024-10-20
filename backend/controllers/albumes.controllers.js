
import Album from "../models/Album.js";


//todos los controller tendran un try and catch para evitar comportamientos inesperados en el cliente.
// como por ejemplo que no termine de cargr nunca la parte del ciente cuando haya un error...


//lista albumes // obtener albumes
export const homeAlbumes = async (req, res) => {
  try {
    const albumes = await Album.find();
    res.send(albumes);
  } catch (error) {
    console.log(error.message);
    //envio elmensajeal ciente para que lo pueda ver
    return res.status(500).json({ message: error.message });
  }
};

// para crear
export const newAlbum = async (req, res) => {
  try {
    const { albumName, artistName, releaseDate, genre, trackCount, songs} =
      req.body;

    const newAlbum = new Album({
        albumName, 
        artistName, 
        releaseDate,
        genre, 
        trackCount, 
        songs
    });
    //guardar en la base de datos
    await newAlbum.save();
    return res.json(newAlbum);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



// para actualizar / editar un Album
export const update = async (req, res) => {
  try {
    // req params es es el parametro tipeado en las rutas en este caso ":id"
    //"findByIdAndUpdate" este metodo busca un id y lo actualiza
    //consulta a trave del modelo Album
    // new true es para que muestr los datos actualizados
    const albumActualizado = await Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.send(albumActualizado);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// para recibir un solo Album
export const getAlbumID = async (req, res) => {
  try {
    //parecido al delete > tras consultar a trvez del modelo Album se buscara por id...
    const datosDelAlbum = await Album.findById(req.params.id);
    if (!datosDelAlbum) return res.sendStatus(404);
    return res.json(datosDelAlbum);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// para eliminar un Album
export const deleteAlbum = async (req, res) => {
  try {
    //consulta a travez del modelo Album
    //el id va a venir desde req.params.id
    const albumRemove = await Album.findByIdAndDelete(req.params.id);

    // validacion si no retorna la publicacion es porque no se encontro nada
    // enviara un codigo de status 404
    if (!albumRemove) return res.sendStatus(404);

    //evita que envia un string, de esa forma el usuario sabe si elimino le
    //retorna un codigo "204" y si no se encontro ese id retorna "404"
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};