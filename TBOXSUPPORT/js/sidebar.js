function setupSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebarToggle");
  const links = document.querySelectorAll(".sidebar-link");

  if (sidebar && toggleBtn && links.length) {
    // Evita múltiples registros de eventos
    if (!toggleBtn.dataset.bound) {
      toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");

        // En móviles, activar modo slide
        if (window.innerWidth <= 600) {
          sidebar.classList.toggle("active");
        }
      });

      toggleBtn.dataset.bound = "true";
    }

    // Click manual: resalta módulo activo
    links.forEach(link => {
      link.addEventListener("click", e => {
        // Solo evitar navegación si el link es "#"
        const href = link.getAttribute("href");
        if (href === "#") e.preventDefault();

        links.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      });
    });

    // Activación por URL (index.html, usuarios.html, etc.)
    const path = window.location.pathname.split("/").pop();
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (href && href === path) {
        link.classList.add("active");
      }
    });
  } else {
    // Si aún no están listos los elementos, reintenta
    setTimeout(setupSidebar, 100);
  }
}

// Ejecutar al cargar el script
setupSidebar();
