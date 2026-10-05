// ---------- Máscaras ----------

export function somenteDigitos(valor) {
  return valor.replace(/\D/g, "");
}

export function mascaraCPF(valor) {
  valor = somenteDigitos(valor).slice(0, 11);
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return valor;
}

export function mascaraTelefone(valor) {
  valor = somenteDigitos(valor).slice(0, 11);
  if (valor.length > 10) return valor.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  if (valor.length > 6) return valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  if (valor.length > 2) return valor.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  if (valor.length > 0) return "(" + valor;
  return valor;
}

export function mascaraCEP(valor) {
  valor = somenteDigitos(valor).slice(0, 8);
  return valor.replace(/(\d{5})(\d{1,3})/, "$1-$2");
}

// ---------- CPF (dígitos verificadores) ----------

export function cpfValido(cpf) {
  cpf = somenteDigitos(cpf);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  for (let t = 9; t < 11; t++) {
    let soma = 0;
    for (let i = 0; i < t; i++) {
      soma += Number(cpf[i]) * (t + 1 - i);
    }
    const digito = ((soma * 10) % 11) % 10;
    if (digito !== Number(cpf[t])) return false;
  }
  return true;
}

// ---------- Idade mínima de 18 anos ----------

// Devolve a data limite no formato AAAA-MM-DD (quem nasceu até ela tem 18+)
export function dataLimiteMaioridade() {
  const hoje = new Date();
  const ano = hoje.getFullYear() - 18;
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

// ---------- Regras de cada campo ----------

const REGEX_NOME = /^[A-Za-zÀ-ÿ]+( [A-Za-zÀ-ÿ']+)+$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TELEFONE = /^\(\d{2}\) \d{4,5}-\d{4}$/;
const REGEX_CEP = /^\d{5}-\d{3}$/;

// Devolve a mensagem de erro do campo, ou "" se estiver tudo certo
export function validarCampo(nome, valor) {
  const texto = typeof valor === "string" ? valor.trim() : valor;

  switch (nome) {
    case "nome":
      if (!texto) return "Informe seu nome completo.";
      if (texto.length < 5 || !REGEX_NOME.test(texto))
        return "Digite nome e sobrenome, usando apenas letras.";
      return "";

    case "cpf":
      if (!texto) return "Informe o CPF.";
      if (!cpfValido(texto)) return "CPF inválido. Confira os números digitados.";
      return "";

    case "nascimento":
      if (!texto) return "Informe sua data de nascimento.";
      if (texto < "1900-01-01") return "Data de nascimento inválida.";
      if (texto > dataLimiteMaioridade()) return "É necessário ter 18 anos ou mais.";
      return "";

    case "email":
      if (!texto) return "Informe o e-mail.";
      if (!REGEX_EMAIL.test(texto)) return "Digite um e-mail válido, como voce@email.com.";
      return "";

    case "telefone":
      if (!texto) return "Informe o telefone com DDD.";
      if (!REGEX_TELEFONE.test(texto)) return "Digite o telefone no formato (00) 00000-0000.";
      return "";

    case "cep":
      if (!texto) return "Informe o CEP.";
      if (!REGEX_CEP.test(texto)) return "Digite o CEP no formato 00000-000.";
      return "";

    case "rua":
      return texto ? "" : "Informe a rua e o número.";

    case "cidade":
      return texto ? "" : "Informe a cidade.";

    case "estado":
      return texto ? "" : "Selecione o estado.";

    case "area":
      return texto ? "" : "Selecione uma área de interesse.";

    case "disponibilidade":
      return texto ? "" : "Escolha sua disponibilidade.";

    case "termos":
      return valor ? "" : "É preciso aceitar os termos para enviar.";

    default:
      return ""; // campos opcionais, como a mensagem
  }
}

// Valida o formulário inteiro e devolve um objeto { campo: mensagem }
export function validarFormulario(dados) {
  const erros = {};
  for (const campo of Object.keys(dados)) {
    erros[campo] = validarCampo(campo, dados[campo]);
  }
  return erros;
}