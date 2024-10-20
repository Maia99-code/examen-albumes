

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.jsx";
import CreateAlbum from "./pages/CreateAlbum.jsx";
import AlbumDetails from "./pages/AlbumDetails.jsx";
import EditAlbum from "./pages/EditAlbum.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateAlbum />} />
        <Route path="/album/:id" element={<AlbumDetails />} />
        <Route path="/albums/:id/edit" element={<EditAlbum />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;