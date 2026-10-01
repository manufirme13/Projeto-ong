import { PROJETOS } from "./dados.js";
import { lerVoluntarios } from "./storage.js";
import { renderizarGrafico } from "./grafico.js";

// Escapa caracteres especiais para não virarem HTML
const esc = (texto) =>
  String(texto).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

// Template de UM card: recebe um objeto e devolve uma string HTML
export function cardProjeto({ id, titulo, badge, descricao, botao }) {
  return `
    <article class="card">
      <h3 id="${esc(id)}">${esc(titulo)}
        <span class="badge badge--${esc(badge.tipo)}">${esc(badge.texto)}</span>
      </h3>
      <p>${esc(descricao)}</p>
      <a href="#/cadastro" class="botao botao-link">${esc(botao)}</a>
    </article>`;
}

// Gera todos os cards: map() transforma cada objeto em string, join() une tudo
export function renderizarProjetos(container, projetos) {
  container.innerHTML = projetos.map(cardProjeto).join("");
}

// Procura os pontos de injeção na página atual e preenche
export function preencherTemplates() {
  const lista = document.getElementById("lista-projetos");
  if (lista) renderizarProjetos(lista, PROJETOS);
  renderizarVoluntarios();
  renderizarGrafico();
}
// Restaura a lista a partir do localStorage
export function renderizarVoluntarios() {
  const lista = document.getElementById("lista-voluntarios");
  if (!lista) return;
  const voluntarios = lerVoluntarios();
  lista.innerHTML = voluntarios.length
    ? voluntarios
        .map(
          (v) => `
    <li class="voluntario">
      <strong>${esc(v.nome)}</strong>
      <span>${esc(v.cidade)} - ${esc(v.estado)}</span>
      <small>Cadastrado em ${new Date(v.criadoEm).toLocaleDateString("pt-BR")}</small>
    </li>`
        )
        .join("")
    : `<li class="voluntario voluntario--vazio">Nenhum voluntário cadastrado ainda.</li>`;
}