import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const EsquemaPerfilAventurero = new mongoose.Schema({
  nombreFantastico: {
    type: String,
    required: [true, "El nombre fantástico es obligatorio"]
  },
  apodoMagico: {
    type: String,
    required: [true, "El apodo mágico es necesario"],
    unique: true
  },
  correoMisterioso: {
    type: String,
    required: [true, "El correo misterioso es obligatorio"],
    unique: true,
    validate: {
      validator: correo => /^([a-z0-9_.-]+)@([a-z.-]+)\.([a-z.]{2,6})$/.test(correo),
      message: props => `${props.value} no es un correo misterioso válido`
    }
  },
  claveSecreta: {
    type: String,
    required: [true, "La clave secreta es obligatoria"],
    minlength: [6, "La clave secreta debe tener al menos 6 caracteres"]
  }
}, { timestamps: true });

EsquemaPerfilAventurero.virtual('confirmacionClaveSecreta')
  .get(function() { return this._confirmacionClaveSecreta; })
  .set(function(value) { this._confirmacionClaveSecreta = value; });

EsquemaPerfilAventurero.pre('validate', function(next) {
  if (this.claveSecreta !== this.confirmacionClaveSecreta) {
    this.invalidate('confirmacionClaveSecreta', 'Las claves secretas deben coincidir');
  }
  next();
});

EsquemaPerfilAventurero.pre('save', async function(next) {
  if (this.isModified('claveSecreta')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.claveSecreta = await bcrypt.hash(this.claveSecreta, salt);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.model('User', EsquemaPerfilAventurero);
