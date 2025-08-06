const columns = document.querySelectorAll('.ticket-column');
let draggedCard = null;

// --- Eventos de arrastre ---
document.querySelectorAll('.ticket-card').forEach(card => {
  card.addEventListener('dragstart', e => {
    draggedCard = card;
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => card.classList.add('dragging'), 0);
  });

  card.addEventListener('dragend', () => {
    draggedCard = null;
    card.classList.remove('dragging');
  });
});

// --- Permitir soltar tarjetas en columnas ---
columns.forEach(column => {
  column.addEventListener('dragover', e => e.preventDefault());
  column.addEventListener('drop', e => {
    e.preventDefault();
    if (draggedCard) {
      column.appendChild(draggedCard);
      updateButtons(draggedCard, column.closest('.ticket-column-container'));
    }
  });
});

// --- Actualiza botones dependiendo de la columna ---
function updateButtons(card, container) {
  const isBacklog = container.classList.contains('backlog');
  let buttonContainer = card.querySelector('.card-buttons');

  if (!buttonContainer) {
    buttonContainer = document.createElement('div');
    buttonContainer.className = 'card-buttons';
    card.appendChild(buttonContainer);
  }

  // Botón Ver Detalles
  let verBtn = buttonContainer.querySelector('.btn-ver-detalles');
  if (!verBtn) {
    verBtn = document.createElement('button');
    verBtn.className = 'btn-ver-detalles';
    verBtn.textContent = 'Ver Detalles';
    buttonContainer.appendChild(verBtn);
    verBtn.addEventListener('click', () => {
      window.location.assign('./detalles-asignar.html');
    });
  }

  // Botón Asignar Ticket (solo en backlog)
  if (isBacklog) {
    let asignarBtn = buttonContainer.querySelector('.btn-asignar-ticket');
    if (!asignarBtn) {
      asignarBtn = document.createElement('button');
      asignarBtn.className = 'btn-asignar-ticket';
      asignarBtn.textContent = 'Asignar Ticket';
      buttonContainer.appendChild(asignarBtn);

      asignarBtn.addEventListener('click', () => {
        // Redirección directa al módulo de asignación
        window.location.assign('./asignar-devsupport.html');
      });
    }
  } else {
    const asignarBtn = buttonContainer.querySelector('.btn-asignar-ticket');
    if (asignarBtn) asignarBtn.remove();
  }
}

// --- Botones que ya estaban cargados al inicio ---
document.querySelectorAll('.btn-ver-detalles').forEach(button => {
  button.addEventListener('click', () => {
    window.location.assign('./detalles-asignar.html');
  });
});

document.querySelectorAll('.btn-asignar-ticket').forEach(button => {
  button.addEventListener('click', () => {
    window.location.assign('./asignar-devsupport.html');
  });
});