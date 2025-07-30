document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-overlay');
  const openBtn = document.querySelector('.btn-add-user');

  // Este bloque puede ejecutarse incluso si el modal se carga dinámicamente
  document.addEventListener('click', function (e) {
    if (e.target.id === 'closeModal' || e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
});
