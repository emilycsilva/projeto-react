import { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";

// Título e subtítulo do header de cada rota
const cabecalhos = {
  "/": {
    titulo: "ONG Patas do Bem",
    subtitulo: "Toda pata merece um lar.",
  },
  "/projetos": {
    titulo: "Nossos Projetos",
    subtitulo: "Conheça as formas de ajudar a Patas do Bem.",
  },
  "/cadastro": {
    titulo: "Cadastro de Voluntários",
    subtitulo: "Faça parte da nossa equipe.",
  },
  "/voluntarios": {
    titulo: "Voluntários Cadastrados",
    subtitulo: "Pessoas que escolheram ajudar.",
  },
};

const cabecalhoPadrao = {
  titulo: "Página não encontrada",
  subtitulo: "O endereço que você procurou não existe.",
};

export default function Layout() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { pathname } = useLocation();

  const cabecalho = cabecalhos[pathname] ?? cabecalhoPadrao;
  const ehHome = pathname === "/";

  // Atualiza o título da aba do navegador quando a rota muda
  useEffect(() => {
    document.title = ehHome
      ? "ONG Patas do Bem"
      : `${cabecalho.titulo} | ONG Patas do Bem`;
  }, [ehHome, cabecalho.titulo]);

  // Fecha o menu hambúrguer ao clicar em um link
  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <div id="interface">
      <header>
        <h1>{cabecalho.titulo}</h1>
        <p>{cabecalho.subtitulo}</p>
        {ehHome && (
          <img
            src="/imagens/imagemcachorro.webp"
            alt="Cachorro esperando por um lar na ONG Patas do Bem"
            width="600"
            height="400"
          />
        )}
      </header>

      <nav>
        <h2>Menu Principal</h2>
        <input
          type="checkbox"
          id="menu-toggle"
          className="menu-toggle"
          aria-label="Abrir ou fechar o menu"
          checked={menuAberto}
          onChange={(e) => setMenuAberto(e.target.checked)}
        />
        <label htmlFor="menu-toggle" className="menu-hamburguer">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <ul className="menu">
          <li>
            <NavLink to="/" end onClick={fecharMenu}>
              Home
            </NavLink>
          </li>
          <li className="tem-submenu">
            <NavLink to="/projetos" onClick={fecharMenu}>
              Projetos
            </NavLink>
            <ul className="submenu">
              <li>
                <Link to="/projetos#voluntariado" onClick={fecharMenu}>
                  Como ser voluntário
                </Link>
              </li>
              <li>
                <Link to="/projetos#doacoes" onClick={fecharMenu}>
                  Como doar
                </Link>
              </li>
              <li>
                <Link to="/projetos#campanhas" onClick={fecharMenu}>
                  Campanhas
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/cadastro" onClick={fecharMenu}>
              Cadastro de colaboradores
            </NavLink>
          </li>
          <li>
            <NavLink to="/voluntarios" onClick={fecharMenu}>
              Voluntários
            </NavLink>
          </li>
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Copyright 2026 - ONG Patas do Bem</p>
      </footer>
    </div>
  );
}