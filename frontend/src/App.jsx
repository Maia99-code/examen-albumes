// src/App.jsx
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import CreateAlbum from "./pages/CreateAlbum";
import AlbumDetails from "./pages/AlbumDetails";
import EditAlbum from "./pages/EditAlbum";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";

const isAuthenticated = () => !!localStorage.getItem("authToken");

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />
        <Route path="/create" element={isAuthenticated() ? <CreateAlbum /> : <Navigate to="/login" />} />
        <Route path="/album/:id" element={isAuthenticated() ? <AlbumDetails /> : <Navigate to="/login" />} />
        <Route path="/album/:id/edit" element={isAuthenticated() ? <EditAlbum /> : <Navigate to="/login" />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
