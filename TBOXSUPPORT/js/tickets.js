document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.ticket-tab');
  const cards = document.querySelectorAll('.ticket-card');

  function switchTab(tabName) {
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    cards.forEach(card => {
      card.classList.toggle('active', card.dataset.status === tabName);
    });
  }
  const initialTab = document.querySelector('.ticket-tab.active');
  const defaultTab = initialTab ? initialTab.dataset.tab : 'Nuevo';
  switchTab(defaultTab);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.tab);
    });
  });

  const detalleButtons = document.querySelectorAll('.ticket-actions button');
  detalleButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = 'detalles.html';
    });
  });
});
