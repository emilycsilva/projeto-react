import { Link } from "react-router-dom";

export default function NaoEncontrada() {
  return (
    <section>
      <h2>Ops! Essa página não existe.</h2>
      <p>
        <Link to="/">Voltar para a página inicial</Link>
      </p>
    </section>
  );
}