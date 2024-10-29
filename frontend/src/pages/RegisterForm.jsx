import { useState } from "react";
import { registerUser } from "../api/authAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      toast.success("Usuario registrado exitosamente");
      navigate("/login");
    } catch (error) {
      // Manejo del error
      if (error.response) {
        // Error del servidor, acceso a los datos de error
        toast.error(error.response.data.message || "Error en el registro");
      } else {
        // Otro tipo de error (como problemas de red)
        toast.error("Error de red o de servidor");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default RegisterForm;
