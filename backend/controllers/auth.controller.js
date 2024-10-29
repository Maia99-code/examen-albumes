import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registrar = async (req, res) => {
  const { claveSecreta, confirmacionClaveSecreta, correoMisterioso } = req.body;

  // Verifica que las claves coincidan
  if (claveSecreta !== confirmacionClaveSecreta) {
    return res.status(400).json({ msg: "Las claves secretas deben coincidir" });
  }

  try {
    // Verifica si el correo ya existe en la base de datos antes de crear el usuario
    const usuarioExistente = await User.findOne({ correoMisterioso });
    if (usuarioExistente) {
      return res.status(400).json({ msg: "El correo ya está en uso." });
    }

    // Si el correo es único, crea el nuevo usuario
    const usuario = await User.create(req.body);
    res.status(201).json({ msg: "¡Usuario creado con éxito!", usuario });
  } catch (err) {
    console.error(err);

    // Manejo de errores más específico
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: "Error de validación", error: err.message });
    } else {
      return res.status(500).json({ msg: "Error del servidor", error: err.message });
    }
  }
};

const iniciarSesion = async (req, res) => {
  const { correoMisterioso, claveSecreta } = req.body;

  try {
    const usuario = await User.findOne({ correoMisterioso });
    if (!usuario) return res.status(400).json({ msg: "Usuario no encontrado" });

    const esClaveValida = await bcrypt.compare(claveSecreta, usuario.claveSecreta);
    if (!esClaveValida) return res.status(400).json({ msg: "Clave incorrecta" });

    // Genera el token JWT
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ msg: "Inicio de sesión exitoso", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error del servidor durante el inicio de sesión", error: err.message });
  }
};

export { registrar, iniciarSesion };
