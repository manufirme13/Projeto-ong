export function abrirModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("aberto");
  modal.querySelector("button")?.focus();
}

export function fecharModal() {
  document
    .querySelectorAll(".modal.aberto")
    .forEach((modal) => modal.classList.remove("aberto"));
}

export function mostrarToast(titulo, mensagem) {
  document.querySelector(".toast")?.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");

  const strong = document.createElement("strong");
  strong.textContent = titulo;
  toast.append(strong, document.createElement("br"), mensagem);

  document.body.append(toast);
  // A animação do CSS dura 10s; quando acaba, o toast sai do DOM
  toast.addEventListener("animationend", () => toast.remove());
}