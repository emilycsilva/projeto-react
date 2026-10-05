import { useState } from "react";
import { Link } from "react-router-dom";
import { listarVoluntarios, removerVoluntario } from "../services/storage.js";
import { AREAS, DISPONIBILIDADES } from "../data/opcoes.js";
import { useFeedback } from "../context/FeedbackContext.jsx";

// Troca o valor salvo (ex.: "lar-temporario") pelo texto bonito
function rotulo(lista, valor) {
  return lista.find((item) => item.valor === valor)?.rotulo ?? valor;
}

export default function Voluntarios() {
  const [voluntarios, setVoluntarios] = useState(() => listarVoluntarios());
  const { mostrarToast, confirmar } = useFeedback();

  async function remover(voluntario) {
    const confirmou = await confirmar({
      titulo: "Remover voluntário",
      mensagem: `Tem certeza que deseja remover o cadastro de ${voluntario.nome}? Essa ação não pode ser desfeita.`,
      textoConfirmar: "Remover",
      textoCancelar: "Cancelar",
    });
    if (!confirmou) return;

    removerVoluntario(voluntario.id);
    setVoluntarios(listarVoluntarios());
    mostrarToast(`Cadastro de ${voluntario.nome} removido.`, "info");
  }

  return (
    <section>
      <h2>Voluntários cadastrados</h2>

      {voluntarios.length === 0 ? (
        <p>
          Nenhum voluntário cadastrado ainda.{" "}
          <Link to="/cadastro">Seja o primeiro!</Link>
        </p>
      ) : (
        <>
          <p>Total de cadastros: {voluntarios.length}</p>
          <div className="tabela-rolagem">
            <table>
              <caption>Lista de voluntários salvos neste navegador</caption>
              <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Cidade</th>
                  <th scope="col">Área</th>
                  <th scope="col">Disponibilidade</th>
                  <th scope="col">Contato</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                {voluntarios.map((v) => (
                  <tr key={v.id}>
                    <td>{v.nome}</td>
                    <td>
                      {v.cidade}/{v.estado}
                    </td>
                    <td>{rotulo(AREAS, v.area)}</td>
                    <td>{rotulo(DISPONIBILIDADES, v.disponibilidade)}</td>
                    <td>
                      {v.email}
                      <br />
                      {v.telefone}
                    </td>
                    <td>
                      <button type="button" onClick={() => remover(v)}>
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <p>
        <Link to="/cadastro">Cadastrar novo voluntário</Link>
      </p>
    </section>
  );
}