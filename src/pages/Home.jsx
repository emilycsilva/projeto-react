import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section id="sobre">
        <h2>Sobre a ONG</h2>
        <p>
          A Patas do Bem é uma organização sem fins lucrativos que resgata,
          cuida e encaminha para adoção cães e gatos abandonados. Nasceu em
          2018, quando um grupo de amigos começou a recolher animais de rua no
          bairro e a tratá-los em uma pequena chácara. Hoje atua com
          voluntários, veterinários parceiros e doações da comunidade.
        </p>

        <h3>Missão</h3>
        <p>
          Resgatar animais em situação de abandono, oferecer cuidados de saúde
          e conscientizar a população sobre a posse responsável.
        </p>

        <h3>Visão</h3>
        <p>
          Ser referência na região no combate ao abandono animal, com cada
          animal resgatado encontrando uma família.
        </p>

        <h3>Valores</h3>
        <p>
          Respeito à vida, responsabilidade, transparência, empatia e trabalho
          em comunidade.
        </p>
      </section>

      <section id="contato">
        <h2>Fale conosco</h2>
        <address>
          <p>
            E-mail:{" "}
            <a href="mailto:contato@patasdobem.org.br">
              contato@patasdobem.org.br
            </a>
          </p>
          <p>
            Telefone: <a href="tel:+5511912345678">(11) 91234-5678</a>
          </p>
          <p>Endereço: Rua das Acácias, 120 - Centro</p>
          <p>Atendimento: sábados e domingos, das 9h às 17h</p>
        </address>
        <p>
          <Link to="/cadastro">Quero ser voluntário</Link>
        </p>
      </section>

      <section id="numeros">
        <h2>Nossos números</h2>
        <ul>
          <li>Mais de 850 animais resgatados</li>
          <li>Mais de 600 adoções realizadas</li>
          <li>Cerca de 120 animais atendidos hoje no abrigo</li>
          <li>45 voluntários ativos</li>
        </ul>
      </section>

      <section id="atuacao">
        <h2>O que a ONG faz</h2>
        <ul>
          <li>Resgate de animais abandonados ou maltratados</li>
          <li>Atendimento veterinário, vacinação e vermifugação</li>
          <li>Castração gratuita ou a preço acessível</li>
          <li>Reabilitação de animais que sofreram maus-tratos</li>
          <li>Feiras de adoção aos finais de semana</li>
          <li>Acompanhamento pós-adoção</li>
        </ul>
      </section>

      <section id="ajuda">
        <h2>Como ajudar</h2>
        <ul>
          <li>Adotar um animal</li>
          <li>Doar ração, remédios ou dinheiro</li>
          <li>Ser voluntário ou lar temporário</li>
          <li>Divulgar a ONG nas redes sociais</li>
        </ul>
      </section>
    </>
  );
}