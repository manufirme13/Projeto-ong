import { preencherTemplates } from "./templates.js";

const ROTAS = {
  inicio: "html/inicio.html",
  projetos: "html/projetos.html",
  cadastro: "html/cadastro.html",
};

// Na primeira carga o foco não é movido, para o Tab começar no link "Pular"
let primeiraCarga = true;

const TITULOS = {
  inicio: "Início",
  projetos: "Projetos",
  cadastro: "Seja voluntário",
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

  // Fecha o menu mobile e informa o estado aos leitores de tela
  const toggle = document.getElementById("menu-toggle");
  toggle.checked = false;
  toggle.setAttribute("aria-expanded", "false");

  // Informa a página atual: título do documento e aria-current no menu
  document.title = `${TITULOS[rota]} - Instituto Esperança`;
  document.querySelectorAll(".menu a").forEach((a) => {
    if (a.getAttribute("href") === `#/${rota}`) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  // Rola até a âncora; sem âncora, volta ao topo e leva o foco ao conteúdo
  const destino = ancora && document.getElementById(ancora);
  if (destino) {
    destino.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
    if (!primeiraCarga) app.focus({ preventScroll: true });
  }
  primeiraCarga = false;
}

function criarMensagem(texto) {
  const p = document.createElement("p");
  p.textContent = texto;
  return p;
}