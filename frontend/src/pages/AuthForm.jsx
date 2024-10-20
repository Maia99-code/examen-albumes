import { useState } from 'react';
import axios from 'axios';

const AuthForm = () => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? '/api/register' : '/api/login';
    try {
      const response = await axios.post(endpoint, { correo, clave }, { withCredentials: true });
      alert(response.data.mensaje);
    } catch (error) {
      alert(error.response.data.mensaje);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isRegistering ? 'Registro' : 'Iniciar Sesión'}</h2>
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo electrónico"
        required
      />
      <input
        type="password"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
        placeholder="Contraseña"
        required
      />
      <button type="submit">{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</button>
      <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Ya tengo cuenta' : 'Crear cuenta'}
      </button>
    </form>
  );
};

export default AuthForm;
