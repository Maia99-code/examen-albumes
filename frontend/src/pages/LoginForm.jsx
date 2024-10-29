import { useState } from "react";
import { loginUser } from "../api/authAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await loginUser(formData);
      localStorage.setItem("authToken", token);
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      // Manejo del error
      if (error.response) {
        // Error del servidor, acceso a los datos de error
        toast.error(error.response.data.message || "Error en el inicio de sesión");
      } else {
        // Otro tipo de error (como problemas de red)
        toast.error("Error de red o de servidor");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
