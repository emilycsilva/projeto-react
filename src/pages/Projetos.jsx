import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Projetos() {
  const { hash, key } = useLocation();

  // Rola até a seção indicada no endereço (ex.: /projetos#doacoes).
  // Sem seção no endereço, volta para o topo da página.
  useEffect(() => {
    if (hash) {
      const secao = document.getElementById(hash.slice(1));
      if (secao) {
        secao.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, key]);

  return (
    <>
      <nav aria-label="Nesta página">
        <h2>Nesta página</h2>
        <ul>
          <li>
            <Link to="/projetos#voluntariado">Como ser voluntário</Link>
          </li>
          <li>
            <Link to="/projetos#doacoes">Como doar</Link>
          </li>
          <li>
            <Link to="/projetos#campanhas">Campanhas em andamento</Link>
          </li>
        </ul>
      </nav>

      <section id="voluntariado">
        <h2>Como ser voluntário</h2>
        <p>
          O trabalho voluntário é a base da Patas do Bem. Qualquer pessoa maior
          de 18 anos pode participar, com poucas horas por semana.
        </p>

        <h3>Áreas de atuação</h3>
        <ul>
          <li>Resgate e transporte de animais</li>
          <li>Lar temporário</li>
          <li>Feiras de adoção aos finais de semana</li>
          <li>Passeios com os cães do abrigo</li>
          <li>Divulgação e redes sociais</li>
          <li>Parte administrativa</li>
        </ul>

        <h3>Passo a passo para participar</h3>
        <ol>
          <li>
            Preencha o <Link to="/cadastro">formulário de cadastro</Link>.
          </li>
          <li>Aguarde nosso contato por e-mail ou telefone.</li>
          <li>Participe da conversa de boas-vindas com a equipe.</li>
          <li>Escolha a área e os dias em que você pode ajudar.</li>
          <li>
            Comece sua atividade acompanhado de um voluntário mais experiente.
          </li>
        </ol>

        <p>
          <Link to="/cadastro">Quero ser voluntário</Link>
        </p>
      </section>

      <section id="doacoes">
        <h2>Como doar</h2>
        <p>
          As doações mantêm o abrigo funcionando. Você pode contribuir com
          dinheiro ou com itens de que os animais precisam.
        </p>

        <h3>Doação financeira</h3>
        <table>
          <caption>Como cada valor ajuda os animais</caption>
          <thead>
            <tr>
              <th scope="col">Valor</th>
              <th scope="col">O que ajuda a custear</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>R$ 20</td>
              <td>Uma semana de ração para um cão</td>
            </tr>
            <tr>
              <td>R$ 50</td>
              <td>Vacinação e vermifugação de um animal</td>
            </tr>
            <tr>
              <td>R$ 150</td>
              <td>Castração de um animal resgatado</td>
            </tr>
          </tbody>
        </table>

        <h3>Dados para doação</h3>
        <dl>
          <dt>Chave Pix</dt>
          <dd>doacoes@patasdobem.org.br</dd>
          <dt>Favorecido</dt>
          <dd>ONG Patas do Bem</dd>
        </dl>

        <h3>Doação de itens</h3>
        <ul>
          <li>Ração para cães e gatos</li>
          <li>Cobertores e caminhas</li>
          <li>Remédios e produtos de higiene</li>
          <li>Produtos de limpeza</li>
        </ul>
        <p>
          Os itens podem ser entregues no abrigo, aos sábados e domingos, das
          9h às 17h.
        </p>
      </section>

      <section id="campanhas">
        <h2>Campanhas em andamento</h2>

        <article>
          <h3>Ração Solidária</h3>
          <p>
            Pontos de coleta de ração, cobertores e remédios em mercados,
            escolas e empresas parceiras.
          </p>
        </article>

        <article>
          <h3>Apadrinhe um Animal</h3>
          <p>
            Quem não pode adotar contribui com um valor mensal para cuidar de
            um animal específico e recebe fotos e notícias dele.
          </p>
        </article>

        <article>
          <h3>Mutirão de Castração</h3>
          <p>
            Castrações gratuitas ou a baixo custo, para reduzir o número de
            filhotes abandonados.
          </p>
        </article>
      </section>

      <aside>
        <h2>Transparência</h2>
        <p>
          Divulgamos periodicamente como as doações são aplicadas. Em caso de
          dúvida, fale com a gente: contato@patasdobem.org.br.
        </p>
      </aside>
    </>
  );
}