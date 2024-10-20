import { Router } from "express";
import { deleteAlbum, getAlbumID, homeAlbumes, newAlbum, update } from "../controllers/albumes.controllers.js";

const router = Router();

//para tener la lista de albumes
router.get('/home', homeAlbumes )
//  para crear 
router.post('/new', newAlbum  )
// para actualizar / editar un album y que traiga un id
router.put('/album/:id', update )
// para recibir solo un album
router.get('/album/:id', getAlbumID )
// para eliminar un album
router.delete('/album/:id', deleteAlbum )


export default router