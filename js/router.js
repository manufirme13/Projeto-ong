import { preencherTemplates } from "./templates.js";
const ROTAS = {
  inicio: "html/inicio.html",
  projetos: "html/projetos.html",
  cadastro: "html/cadastro.html",
};

export function iniciarRouter() {
  window.addEventListener("hashchange", renderizar);
  renderizar();
}

async function renderizar() {
  const hash = location.hash;

  // Hashes como #modal-doacao não são rotas: ignora
  if (hash && !hash.startsWith("#/")) return;

  const [nome, ancora] = hash.slice(2).split("/");
  const rota = nome || "inicio";
  const app = document.getElementById("app");
  const overlays = document.getElementById("overlays");

  if (!ROTAS[rota]) {
    app.replaceChildren(criarMensagem("Página não encontrada."));
    overlays.replaceChildren();
    return;
  }

  try {
    const resposta = await fetch(ROTAS[rota]);
    if (!resposta.ok) throw new Error(resposta.status);
    const html = await resposta.text();

    const doc = new DOMParser().parseFromString(html, "text/html");
    const principal = doc.querySelector("main");

    // Limpa o contêiner e injeta o novo conteúdo
    app.replaceChildren(...principal.childNodes);
    // O que sobrou fora do <main> (modal, toast) vai para #overlays
    const extras = [...doc.body.children].filter((el) => el !== principal);
    overlays.replaceChildren(...extras);
        preencherTemplates();
  } catch (erro) {
    app.replaceChildren(criarMensagem("Erro ao carregar a página."));
    console.error(erro);
    return;
  }

  // Fecha o menu mobile e ajusta a rolagem
  document.getElementById("menu-toggle").checked = false;
  const destino = ancora && document.getElementById(ancora);
  destino ? destino.scrollIntoView() : window.scrollTo(0, 0);
}

function criarMensagem(texto) {
  const p = document.createElement("p");
  p.textContent = texto;
  return p;
}