import { Router } from "express";
import {
    deleteAlbum,
    getAlbumID,
    homeAlbumes,
    newAlbum,
    update
} from "../controllers/albumes.controllers.js";

const router = Router();

// Obtener la lista de álbumes
router.get('/', homeAlbumes); // Cambié '/home' a '/' para simplificar la ruta

// Crear un nuevo álbum
router.post('/', newAlbum); // Cambié '/new' a '/' para seguir el mismo patrón

// Actualizar un álbum por ID
router.put('/:id', update); // Cambié '/album/:id' a '/:id' para seguir el mismo patrón

// Obtener un álbum específico por ID
router.get('/:id', getAlbumID); // Cambié '/album/:id' a '/:id' para seguir el mismo patrón

// Eliminar un álbum por ID
router.delete('/:id', deleteAlbum); // Cambié '/album/:id' a '/:id' para seguir el mismo patrón

export default router;
