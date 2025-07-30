$(document).ready(function() {
  const table = $('#historial-table').DataTable({
    dom: 'Bfrtip',
    searching: false, // 🚫 Desactiva el buscador por defecto
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
