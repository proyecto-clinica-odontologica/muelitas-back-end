

function mostrarCheck(checkboxId) {
    var checkbox = document.getElementById(checkboxId);
    var checkIcon = checkbox.nextElementSibling.querySelector(".check");
  
    if (checkbox.checked) {
      checkIcon.style.display = "inline-block"; // Muestra el icono cuando el checkbox está marcado
    } else {
      checkIcon.style.display = "none"; // Oculta el icono cuando el checkbox está desmarcado
    }
  
    // Desmarcar el otro checkbox si está marcado
    var otrosCheckboxes = document.querySelectorAll(".checkbox"); // Selecciona todos los checkboxes
    for (var i = 0; i < otrosCheckboxes.length; i++) {
      if (otrosCheckboxes[i].id !== checkboxId) {
        otrosCheckboxes[i].checked = false;
        otrosCheckboxes[i].nextElementSibling.querySelector(".check").style.display = "none";
      }
    }
  }