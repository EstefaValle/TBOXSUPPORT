// ========== MODO OSCURO PERSISTENTE ==========
const darkToggleBtn = document.getElementById("darkModeToggle");
const sidebarToggle = document.getElementById("sidebarToggle");

window.addEventListener("DOMContentLoaded", () => {
  const isDark = localStorage.getItem("dark-mode") === "true";
  if (isDark) {
    document.body.classList.add("dark");
    if (darkToggleBtn) {
      darkToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Modo Claro';
    }
    if (sidebarToggle) {
      sidebarToggle.style.color = "#fff";
    }
  }
});

if (darkToggleBtn) {
  darkToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");

    localStorage.setItem("dark-mode", isDark);
    darkToggleBtn.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i> Modo Claro'
      : '<i class="fa-solid fa-moon"></i> Modo Oscuro';

    sidebarToggle.style.color = isDark ? "#fff" : "#333";
  });
}

// ========== DROPDOWN USUARIO ==========
const userToggle = document.getElementById("userToggle");
const dropdown = document.getElementById("dropdownMenu");

if (userToggle) {
  userToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("active");

    const chevron = userToggle.querySelector("i.fa-chevron-down");
    if (chevron) {
      chevron.style.transform = dropdown.classList.contains("active") ? "rotate(180deg)" : "rotate(0)";
    }
  });

  document.addEventListener("click", (e) => {
    if (!userToggle.contains(e.target)) {
      dropdown.classList.remove("active");
      const chevron = userToggle.querySelector("i.fa-chevron-down");
      if (chevron) chevron.style.transform = "rotate(0)";
    }
  });
}

// ========== GRÁFICO DE DONA ==========
const chartCanvas = document.getElementById("priorityChart");
if (chartCanvas) {
  const ctx = chartCanvas.getContext("2d");
  const p1 = 10, p2 = 10, p3 = 10;
  const total = p1 + p2 + p3;

  document.getElementById("priorityCenter").textContent = total;
  document.getElementById("valP1").textContent = p1;
  document.getElementById("valP2").textContent = p2;
  document.getElementById("valP3").textContent = p3;

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["P1", "P2", "P3"],
      datasets: [{
        data: [p1, p2, p3],
        backgroundColor: ["#d32f2f", "#388e3c", "#fbc02d"],
        cutout: "70%",
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.label}: ${ctx.parsed}`
          }
        }
      }
    }
  });
}

// ========== EXPORTAR GRÁFICA ==========
const exportMenu = document.getElementById("exportMenu");
const exportOptions = exportMenu?.querySelector(".export-options");

if (exportMenu && exportOptions) {
  exportMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    exportMenu.classList.toggle("active");
    exportOptions.style.display = "flex";
  });

  document.addEventListener("click", () => {
    exportMenu.classList.remove("active");
    exportOptions.style.display = "none";
  });

  const exportChartAs = (type) => {
    exportOptions.style.display = "none";
    const chartBox = document.querySelector(".priority-chart");

    setTimeout(() => {
      html2canvas(chartBox).then(canvas => {
        const link = document.createElement("a");
        link.download = `prioridad.${type}`;
        link.href = canvas.toDataURL(`image/${type}`);
        link.click();
        exportOptions.style.display = "flex";
      });
    }, 100);
  };

  document.getElementById("exportPng")?.addEventListener("click", () => exportChartAs("png"));
  document.getElementById("exportJpg")?.addEventListener("click", () => exportChartAs("jpeg"));
}
