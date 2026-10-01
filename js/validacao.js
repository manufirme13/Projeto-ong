const UFS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA",
  "PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

// CPF: confere o formato e os dois dígitos verificadores
function cpfValido(cpf) {
  const n = cpf.replace(/\D/g, "");
  if (n.length !== 11 || /^(\d)\1{10}$/.test(n)) return false; // ex.: 111.111.111-11
  const digito = (qtd) => {
    let soma = 0;
    for (let i = 0; i < qtd; i++) soma += Number(n[i]) * (qtd + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return digito(9) === Number(n[9]) && digito(10) === Number(n[10]);
}

function calcularIdade(dataISO) {
  const hoje = new Date();
  const nasc = new Date(`${dataISO}T00:00:00`);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const mes = hoje.getMonth() - nasc.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) idade--;
  return idade;
}

// Cada regra recebe o valor e devolve "" (ok) ou a mensagem de erro
const REGRAS = {
  nome: (v) => {
    if (!v) return "Informe seu nome completo.";
    if (!/^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)+$/.test(v))
      return "Digite nome e sobrenome, apenas com letras.";
    return "";
  },
  email: (v) => {
    if (!v) return "Informe seu e-mail.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
      return "E-mail inválido. Exemplo: nome@dominio.com";
    return "";
  },
  cpf: (v) => {
    if (!v) return "Informe seu CPF.";
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v)) return "Use o formato 000.000.000-00.";
    if (!cpfValido(v)) return "CPF inválido. Confira os números.";
    return "";
  },
  nascimento: (v) => {
    if (!v) return "Informe sua data de nascimento.";
    const idade = calcularIdade(v);
    if (idade < 0) return "A data não pode ser no futuro.";
    if (idade < 18) return "É preciso ter 18 anos ou mais para ser voluntário.";
    if (idade > 120) return "Data de nascimento inválida.";
    return "";
  },
  cep: (v) => {
    if (!v) return "Informe seu CEP.";
    if (!/^\d{5}-\d{3}$/.test(v)) return "Use o formato 00000-000.";
    return "";
  },
  endereco: (v) => (v.length >= 5 ? "" : "Informe seu endereço completo."),
  cidade: (v) => (v.length >= 2 ? "" : "Informe sua cidade."),
  estado: (v) => {
    if (!v) return "Informe o estado.";
    if (!UFS.includes(v.toUpperCase())) return "Use uma sigla válida, como PR ou SP.";
    return "";
  },
};

// Aplica o estado visual: classes do CSS + mensagem abaixo do campo
export function aplicarEstado(campo, mensagem) {
  let aviso = document.getElementById(`erro-${campo.id}`);
  if (!aviso) {
    aviso = document.createElement("span");
    aviso.id = `erro-${campo.id}`;
    aviso.className = "mensagem-erro";
    aviso.setAttribute("role", "alert");
    campo.insertAdjacentElement("afterend", aviso);
  }
  const temErro = mensagem !== "";
  campo.classList.toggle("campo--erro", temErro);
  campo.classList.toggle("campo--ok", !temErro);
  campo.setAttribute("aria-invalid", String(temErro));
  campo.setAttribute("aria-describedby", aviso.id);
  aviso.textContent = mensagem;
  aviso.hidden = !temErro;
}

// Valida UM campo; devolve true se estiver válido
export function validarCampo(campo) {
  const regra = REGRAS[campo.id];
  if (!regra) return true;
  const mensagem = regra(campo.value.trim());
  aplicarEstado(campo, mensagem);
  return mensagem === "";
}

// Valida o formulário inteiro; devolve a lista de campos inválidos
export function validarFormulario(form) {
  return [...form.querySelectorAll("input")].filter((c) => !validarCampo(c));
}

// Remove classes e mensagens (usado depois do envio)
export function limparEstados(form) {
  form.querySelectorAll("input").forEach((c) => {
    c.classList.remove("campo--erro", "campo--ok");
    c.removeAttribute("aria-invalid");
  });
  form.querySelectorAll(".mensagem-erro").forEach((m) => (m.hidden = true));
}