import { lerVoluntarios } from "./storage.js";

export async function renderizarGrafico() {
  if (!document.getElementById("grafico-estados")) return;

  // Import dinâmico: a biblioteca só é baixada quando o gráfico é necessário
  const { default: Chart } = await import(
    "https://cdn.jsdelivr.net/npm/chart.js@4.4.7/auto/+esm"
  );

  // A rota pode ter mudado durante o download: confere de novo
  const canvas = document.getElementById("grafico-estados");
  if (!canvas) return;

  Chart.getChart(canvas)?.destroy(); // evita gráficos sobrepostos

  const contagem = {};
  lerVoluntarios().forEach((v) => {
    contagem[v.estado] = (contagem[v.estado] || 0) + 1;
  });
  if (Object.keys(contagem).length === 0) return;

  const cor = getComputedStyle(document.documentElement)
    .getPropertyValue("--cor-secundaria")
    .trim();

  new Chart(canvas, {
    type: "bar",
    data: {
      labels: Object.keys(contagem),
      datasets: [{ label: "Voluntários por estado", data: Object.values(contagem), backgroundColor: cor }],
    },
    options: { responsive: true, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } },
  });
}