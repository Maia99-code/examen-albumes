import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  clave: {
    type: String,
    required: true,
  },
});

// Método para encriptar la contraseña antes de guardarla
userSchema.pre('save', async function (next) {
  if (this.isModified('clave')) {
    const salt = await bcrypt.genSalt(10);
    this.clave = await bcrypt.hash(this.clave, salt);
  }
  next();
});

// Método para comparar la contraseña
userSchema.methods.comparePassword = function (clave) {
  return bcrypt.compare(clave, this.clave);
};

export default mongoose.model('User', userSchema);
