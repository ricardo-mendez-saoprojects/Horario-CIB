/* ─── Horario CIB · charts.js ───
   Helper de Chart.js tematizado con los tokens CSS. Las páginas llaman a
   renderMonthlyChart(id, labels, trabajado, objetivo); al cambiar el tema
   se redibuja con los colores nuevos. */

function cibToken(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

function renderMonthlyChart(canvasId, labels, trabajado, objetivo) {
  const el = document.getElementById(canvasId);
  if (!el || typeof Chart === 'undefined') return;

  const draw = () => {
    const existing = Chart.getChart(el);
    if (existing) existing.destroy();

    const text = cibToken('--text-muted');
    const grid = cibToken('--border');

    new Chart(el, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Trabajado',
            data: trabajado,
            backgroundColor: cibToken('--primary'),
            borderRadius: 4,
          },
          {
            label: 'Objetivo',
            data: objetivo,
            backgroundColor: cibToken('--zero-soft'),
            borderColor: cibToken('--border-strong'),
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: text, boxWidth: 12, boxHeight: 12 },
          },
        },
        scales: {
          x: { ticks: { color: text }, grid: { display: false } },
          y: { ticks: { color: text }, grid: { color: grid } },
        },
      },
    });
  };

  draw();
  document.addEventListener('themechange', draw);
}
