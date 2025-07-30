document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const volverBtn = document.querySelector(".btn.volver");
  const avanzarBtn = document.querySelector(".btn.avanzar");

  const scrollAmount = 150;

  prevBtn?.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn?.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  volverBtn?.addEventListener('click', () => {
    window.location.href = "asignar-ticket.html";
  });

  avanzarBtn?.addEventListener('click', () => {
    const ticketId = document.querySelector(".ticket-number strong")?.textContent.trim();
    if (ticketId) {
      localStorage.setItem("mover-ticket-id", ticketId);
      window.location.href = "asignar-ticket.html";
    }
  });
});
