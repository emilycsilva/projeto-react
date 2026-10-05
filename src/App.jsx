import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Projetos from "./pages/Projetos.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Voluntarios from "./pages/Voluntarios.jsx";
import NaoEncontrada from "./pages/NaoEncontrada.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/voluntarios" element={<Voluntarios />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}