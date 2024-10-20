import { Router } from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { PORT } from '../config.js';

const router = Router();
const LLAVE_SECRETA = process.env.SECRET_KEY || 'clave_secreta_super_secreta';

// Ruta de registro
router.post('/register', async (req, res) => {
  const { correo, clave } = req.body;
  try {
    const nuevoUsuario = new User({ correo, clave });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear usuario', error: error.message });
  }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { correo, clave } = req.body;
  try {
    const usuario = await User.findOne({ correo });
    if (!usuario || !(await usuario.comparePassword(clave))) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const tokenUsuario = jwt.sign({ id: usuario._id }, LLAVE_SECRETA, { expiresIn: '1h' });
    res.cookie('tokenUsuario', tokenUsuario, { httpOnly: true }).json({ mensaje: '¡Inicio de sesión exitoso!' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
  }
});

// Ruta de cierre de sesión
router.post('/logout', (req, res) => {
  res.clearCookie('tokenUsuario').json({ mensaje: '¡Cierre de sesión exitoso!' });
});

export default router;
