import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AREAS, DISPONIBILIDADES, UFS } from "../data/opcoes.js";
import {
  mascaraCPF,
  mascaraTelefone,
  mascaraCEP,
  dataLimiteMaioridade,
  validarCampo,
  validarFormulario,
} from "../utils/validation.js";
import { adicionarVoluntario, cpfJaCadastrado } from "../services/storage.js";
import { useFeedback } from "../context/FeedbackContext.jsx";

const DADOS_INICIAIS = {
  nome: "",
  cpf: "",
  nascimento: "",
  email: "",
  telefone: "",
  cep: "",
  rua: "",
  cidade: "",
  estado: "",
  area: "",
  disponibilidade: "",
  mensagem: "",
  termos: false,
};

const MASCARAS = {
  cpf: mascaraCPF,
  telefone: mascaraTelefone,
  cep: mascaraCEP,
};

const MSG_CPF_DUPLICADO = "Este CPF já está cadastrado.";

// Valida um campo e, no caso do CPF, também confere se já foi cadastrado
function validar(nome, valor) {
  const erro = validarCampo(nome, valor);
  if (!erro && nome === "cpf" && cpfJaCadastrado(valor)) {
    return MSG_CPF_DUPLICADO;
  }
  return erro;
}

// Mostra a mensagem de erro embaixo do campo
function MensagemErro({ campo, texto }) {
  if (!texto) return null;
  return (
    <span id={`erro-${campo}`} className="erro-campo">
      {texto}
    </span>
  );
}

export default function Cadastro() {
  const [dados, setDados] = useState(DADOS_INICIAIS);
  const [erros, setErros] = useState({});
  const [tocados, setTocados] = useState({});
  const navigate = useNavigate();
  const { mostrarToast } = useFeedback();
  const limiteNascimento = dataLimiteMaioridade();

  // Quando o usuário digita ou escolhe algo
  function atualizar(evento) {
    const { name, value, type, checked } = evento.target;
    let novoValor = type === "checkbox" ? checked : value;
    if (MASCARAS[name]) novoValor = MASCARAS[name](novoValor);

    setDados((atual) => ({ ...atual, [name]: novoValor }));

    // Rádio e checkbox validam na hora; os outros só depois de "tocados"
    if (type === "checkbox" || type === "radio" || tocados[name]) {
      setTocados((atual) => ({ ...atual, [name]: true }));
      setErros((atual) => ({ ...atual, [name]: validar(name, novoValor) }));
    }
  }

  // Quando o usuário sai do campo
  function aoSair(evento) {
    const { name } = evento.target;
    setTocados((atual) => ({ ...atual, [name]: true }));
    setErros((atual) => ({ ...atual, [name]: validar(name, dados[name]) }));
  }

  function classeDoCampo(nome) {
    if (!tocados[nome]) return undefined;
    if (erros[nome]) return "campo-erro";
    return dados[nome] ? "campo-ok" : undefined;
  }

  // Propriedades repetidas em todos os campos
  function propsDoCampo(nome) {
    const temErro = Boolean(erros[nome]);
    return {
      name: nome,
      onChange: atualizar,
      onBlur: aoSair,
      className: classeDoCampo(nome),
      "aria-invalid": temErro ? "true" : undefined,
      "aria-describedby": temErro ? `erro-${nome}` : undefined,
    };
  }

  function enviar(evento) {
    evento.preventDefault();

    const novosErros = validarFormulario(dados);
    if (!novosErros.cpf && cpfJaCadastrado(dados.cpf)) {
      novosErros.cpf = MSG_CPF_DUPLICADO;
    }

    const todosTocados = {};
    Object.keys(dados).forEach((campo) => (todosTocados[campo] = true));
    setTocados(todosTocados);
    setErros(novosErros);

    const camposComErro = Object.keys(novosErros).filter((c) => novosErros[c]);
    if (camposComErro.length > 0) {
      mostrarToast("Corrija os campos destacados em vermelho antes de enviar.", "erro");
      const primeiro = camposComErro[0];
      const idParaFocar =
        primeiro === "disponibilidade" ? `disp-${DISPONIBILIDADES[0].valor}` : primeiro;
      document.getElementById(idParaFocar)?.focus();
      return;
    }

    adicionarVoluntario(dados);
    const primeiroNome = dados.nome.trim().split(" ")[0];
    mostrarToast(
      `Cadastro enviado com sucesso, ${primeiroNome}! Obrigado por ajudar a Patas do Bem.`,
      "sucesso"
    );
    navigate("/voluntarios");
  }

  function limpar() {
    setDados(DADOS_INICIAIS);
    setErros({});
    setTocados({});
    mostrarToast("Formulário limpo.", "info", 3000);
  }

  return (
    <>
      <h2>Formulário de cadastro</h2>
      <p>Campos com * são obrigatórios.</p>

      <form id="formCadastro" onSubmit={enviar} noValidate>
        <fieldset>
          <legend>Dados pessoais</legend>

          <label htmlFor="nome">
            Nome completo *
            <input
              type="text"
              id="nome"
              required
              maxLength={80}
              autoComplete="name"
              placeholder="Maria da Silva"
              value={dados.nome}
              {...propsDoCampo("nome")}
            />
            <MensagemErro campo="nome" texto={erros.nome} />
          </label>

          <label htmlFor="cpf">
            CPF *
            <input
              type="text"
              id="cpf"
              required
              inputMode="numeric"
              maxLength={14}
              placeholder="000.000.000-00"
              value={dados.cpf}
              {...propsDoCampo("cpf")}
            />
            <MensagemErro campo="cpf" texto={erros.cpf} />
          </label>

          <label htmlFor="nascimento">
            Data de nascimento *
            <input
              type="date"
              id="nascimento"
              required
              min="1900-01-01"
              max={limiteNascimento}
              value={dados.nascimento}
              {...propsDoCampo("nascimento")}
            />
            <small>É necessário ter 18 anos ou mais.</small>
            <MensagemErro campo="nascimento" texto={erros.nascimento} />
          </label>
        </fieldset>

        <fieldset>
          <legend>Contato</legend>

          <label htmlFor="email">
            E-mail *
            <input
              type="email"
              id="email"
              required
              maxLength={100}
              autoComplete="email"
              placeholder="voce@email.com"
              value={dados.email}
              {...propsDoCampo("email")}
            />
            <MensagemErro campo="email" texto={erros.email} />
          </label>

          <label htmlFor="telefone">
            Telefone com DDD *
            <input
              type="tel"
              id="telefone"
              required
              inputMode="numeric"
              maxLength={15}
              autoComplete="tel"
              placeholder="(11) 91234-5678"
              value={dados.telefone}
              {...propsDoCampo("telefone")}
            />
            <MensagemErro campo="telefone" texto={erros.telefone} />
          </label>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>

          <label htmlFor="cep">
            CEP *
            <input
              type="text"
              id="cep"
              required
              inputMode="numeric"
              maxLength={9}
              autoComplete="postal-code"
              placeholder="00000-000"
              value={dados.cep}
              {...propsDoCampo("cep")}
            />
            <MensagemErro campo="cep" texto={erros.cep} />
          </label>

          <label htmlFor="rua">
            Rua e número *
            <input
              type="text"
              id="rua"
              required
              maxLength={100}
              autoComplete="address-line1"
              value={dados.rua}
              {...propsDoCampo("rua")}
            />
            <MensagemErro campo="rua" texto={erros.rua} />
          </label>

          <label htmlFor="cidade">
            Cidade *
            <input
              type="text"
              id="cidade"
              required
              maxLength={60}
              value={dados.cidade}
              {...propsDoCampo("cidade")}
            />
            <MensagemErro campo="cidade" texto={erros.cidade} />
          </label>

          <label htmlFor="estado">
            Estado *
            <select
              id="estado"
              required
              value={dados.estado}
              {...propsDoCampo("estado")}
            >
              <option value="">Selecione...</option>
              {UFS.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
            <MensagemErro campo="estado" texto={erros.estado} />
          </label>
        </fieldset>

        <fieldset>
          <legend>Como você quer ajudar?</legend>

          <label htmlFor="area">
            Área de interesse *
            <select
              id="area"
              required
              value={dados.area}
              {...propsDoCampo("area")}
            >
              <option value="">Selecione...</option>
              {AREAS.map((area) => (
                <option key={area.valor} value={area.valor}>
                  {area.rotulo}
                </option>
              ))}
            </select>
            <MensagemErro campo="area" texto={erros.area} />
          </label>

          <fieldset>
            <legend>Disponibilidade *</legend>
            {DISPONIBILIDADES.map((opcao) => (
              <label key={opcao.valor}>
                <input
                  type="radio"
                  id={`disp-${opcao.valor}`}
                  name="disponibilidade"
                  value={opcao.valor}
                  required
                  checked={dados.disponibilidade === opcao.valor}
                  onChange={atualizar}
                />{" "}
                {opcao.rotulo}
              </label>
            ))}
            <MensagemErro campo="disponibilidade" texto={erros.disponibilidade} />
          </fieldset>

          <label htmlFor="mensagem-texto">
            Conte um pouco sobre você
            <textarea
              id="mensagem-texto"
              rows={4}
              cols={40}
              maxLength={300}
              value={dados.mensagem}
              {...propsDoCampo("mensagem")}
            />
          </label>
        </fieldset>

        <label htmlFor="termos">
          <input
            type="checkbox"
            id="termos"
            required
            checked={dados.termos}
            {...propsDoCampo("termos")}
          />{" "}
          Aceito ser contatado pela ONG e autorizo o uso dos meus dados para o
          cadastro. *
          <MensagemErro campo="termos" texto={erros.termos} />
        </label>

        <button type="submit">Enviar cadastro</button>
        <button type="button" onClick={limpar}>
          Limpar
        </button>
      </form>
    </>
  );
}