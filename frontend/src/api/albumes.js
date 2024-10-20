import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000' // Cambia esto según sea necesario
});

//cuando se haga elbuild generara una carptea y direactamente en express y se realizara todo
//para no poner localhost,, en el json se agregara una propiedad solo para desarrollo
//getAlbumesRequests función asíncrona que utiliza Axios para realizar una solicitud HTTP GET a la ruta "/home"...

export const getAlbumesRequests = async () => await api.get("/home");

// esta funcion es para crear un album
export const createAlbumRequest = async (album) => await api.post("/new", album);

//ruta del back donde se elimina los albumes
export const deleteAlbumRequest = async id => await api.delete("/album/" + id );

//ruta del back donde se recibe un id
export const getAlbumDescRequest = async id => await api.get("/album/" + id )


// Actualizar un álbum por ID
export const updateAlbumRequest = async (id, album) => await api.put("/album/" + id, album);