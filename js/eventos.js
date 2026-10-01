import { abrirModal, fecharModal, mostrarToast } from "./ui.js";
import { validarCampo, validarFormulario, limparEstados, aplicarEstado } from "./validacao.js";
import { salvarVoluntario, cpfJaCadastrado, limparVoluntarios } from "./storage.js";
import { renderizarVoluntarios } from "./templates.js";
import { renderizarGrafico } from "./grafico.js";

const MASCARAS = {
  cpf: (v) =>
    v.replace(/\D/g, "").slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2"),
  cep: (v) =>
    v.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2"),
  estado: (v) => v.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase(),
};

export function iniciarEventos() {
  const app = document.getElementById("app");

  document.addEventListener("click", (e) => {
    // Link "Pular para o conteúdo": move o foco sem alterar o hash da URL
    if (e.target.closest(".pular-link")) {
      e.preventDefault();
      app.focus();
      return;
    }
    const abrir = e.target.closest("[data-abrir-modal]");
    if (abrir) {
      abrirModal(abrir.dataset.abrirModal);
      return;
    }
    if (e.target.closest("[data-fechar-modal]") || e.target.classList.contains("modal")) {
      fecharModal();
    }
    if (e.target.closest(".menu a")) {
      const toggle = document.getElementById("menu-toggle");
      toggle.checked = false;
      toggle.setAttribute("aria-expanded", "false");
    }
    if (e.target.closest("[data-limpar-voluntarios]")) {
      limparVoluntarios();
      renderizarVoluntarios();
      renderizarGrafico();
    }
  });

  // Mantém aria-expanded do menu hambúrguer sincronizado com o checkbox
  document.addEventListener("change", (e) => {
    if (e.target.id === "menu-toggle") {
      e.target.setAttribute("aria-expanded", String(e.target.checked));
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharModal();
  });

  app.addEventListener("input", (e) => {
    const campo = e.target;
    const mascara = MASCARAS[campo.id];
    if (mascara) campo.value = mascara(campo.value);
    if (campo.matches(".campo--erro, .campo--ok")) validarCampo(campo);
  });

  app.addEventListener("focusout", (e) => {
    if (e.target.matches("input")) validarCampo(e.target);
  });

  app.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const invalidos = validarFormulario(form);

    if (invalidos.length > 0) {
      invalidos[0].focus();
      return;
    }

    // Converte os campos do formulário em um objeto simples
    const dados = Object.fromEntries(
      [...new FormData(form)].map(([campo, valor]) => [campo, valor.trim()])
    );

    if (cpfJaCadastrado(dados.cpf)) {
      const campo = form.querySelector("#cpf");
      aplicarEstado(campo, "Este CPF já está cadastrado.");
      campo.focus();
      return;
    }

    salvarVoluntario(dados);
    renderizarVoluntarios();
    renderizarGrafico();
    mostrarToast("Cadastro recebido!", "Em breve entraremos em contato.");
    form.reset();
    limparEstados(form);
  });
}