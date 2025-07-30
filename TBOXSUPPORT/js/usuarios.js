// Cargar el modal dinámicamente y conectar eventos una vez insertado
fetch('../components/modal-agregar-usuario.html')
  .then(res => res.text())
  .then(html => {
    document.body.insertAdjacentHTML('beforeend', html);

    const modal = document.getElementById('modal-overlay');
    const openBtn = document.querySelector('.btn-add-user');

    // Abrir modal
    openBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });

    // Cerrar modal con botón X o clic fuera del modal
    document.addEventListener('click', function (e) {
      if (e.target.id === 'closeModal' || e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });


// Ejecutar DataTables y buscador una vez el DOM esté listo
$(document).ready(function() {
  const table = $('#usuarios-table').DataTable({
    dom: 'Bfrtip',
    searching: false,
    buttons: [
      { extend: 'copy',   text: 'Copiar' },
      { extend: 'csv',    text: 'CSV' },
      { extend: 'excel',  text: 'Excel' },
      { extend: 'pdf',    text: 'PDF' },
      { extend: 'print',  text: 'Imprimir' }
    ],
    language: {
      search: "",
      searchPlaceholder: ""
    }
  });

  // Insertar botones en tu contenedor personalizado
  table.buttons().container().appendTo('#dt-buttons');

  // Enlazar tu buscador externo personalizado
  $('#custom-search').on('keyup', function() {
    table.search(this.value).draw();
  });
});
