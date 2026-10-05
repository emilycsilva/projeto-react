import { somenteDigitos } from "../utils/validation.js";

const CHAVE = "patasdobem:voluntarios";

// Lê a lista salva. Se não houver nada (ou der erro), devolve lista vazia.
export function listarVoluntarios() {
  try {
    const texto = localStorage.getItem(CHAVE);
    return texto ? JSON.parse(texto) : [];
  } catch {
    return [];
  }
}

function salvarLista(lista) {
  localStorage.setItem(CHAVE, JSON.stringify(lista));
}

export function adicionarVoluntario(dados) {
  const novo = {
    ...dados,
    id: String(Date.now()),
    criadoEm: new Date().toISOString(),
  };
  salvarLista([...listarVoluntarios(), novo]);
  return novo;
}

export function removerVoluntario(id) {
  salvarLista(listarVoluntarios().filter((v) => v.id !== id));
}

export function cpfJaCadastrado(cpf) {
  const digitos = somenteDigitos(cpf);
  return listarVoluntarios().some((v) => somenteDigitos(v.cpf) === digitos);
}