const CHAVE = "instituto-esperanca:voluntarios";

// GET: lê a string, converte (parse) de volta para array
export function lerVoluntarios() {
  try {
    const bruto = localStorage.getItem(CHAVE); // string ou null
    const dados = bruto ? JSON.parse(bruto) : [];
    return Array.isArray(dados) ? dados : [];
  } catch (erro) {
    console.error("Dados corrompidos no localStorage:", erro);
    return [];
  }
}

// SET: lê a lista atual, acrescenta e grava tudo de novo como string
export function salvarVoluntario(dados) {
  const lista = lerVoluntarios();
  lista.push({ ...dados, id: Date.now(), criadoEm: new Date().toISOString() });
  localStorage.setItem(CHAVE, JSON.stringify(lista));
  return lista;
}

export function cpfJaCadastrado(cpf) {
  return lerVoluntarios().some((v) => v.cpf === cpf);
}

export function limparVoluntarios() {
  localStorage.removeItem(CHAVE);
}