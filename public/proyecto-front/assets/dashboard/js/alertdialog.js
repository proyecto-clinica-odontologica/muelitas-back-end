function confirmarEliminacion() {
    // Utiliza el cuadro de diálogo nativo de JavaScript para mostrar el mensaje de confirmación
    if (confirm("El siguiente elemento sera eliminado, ¿Desea continuar?")) {
      // Si el usuario confirma, redirecciona a la página de eliminación
      window.location.href = window.location.href;
    }
  }