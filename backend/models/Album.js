// modelacion de datos que se estaran guardando
import mongoose from "mongoose";

//objeto schema que recibe un objeto como parametro en el que se le va a pasar las propiedaddes que se quieren guardar

//trim es para sacar los epsacios de ambos lados, ejemplo "    hola   " => "hola"
const albumSchema = new mongoose.Schema({
  // albumName
  albumName: {
    type: String,
    required: true,
    trim: true,
  },
  //artistName
  artistName: {
    type: String,
    required: true,
    trim: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },

  genre: {
    type: String,
    required: true,
    trim: true,
  },

  trackCount: {
    type: Number,
    required: true,
  },
  songs: {
    type: [String],
    default: [],
  },
  
});

export default mongoose.model("Album", albumSchema);
