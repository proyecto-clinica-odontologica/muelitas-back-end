/*
Esta función no permite que el ingreso solo sea de numeros
y ningun otro caracter
*/ 

function validarNumero(input) {
   input.addEventListener('input', function(event) {
     const valor = event.target.value;
     const valorFiltrado = valor.replace(/[^0-9 -]/g, '');
     event.target.value = valorFiltrado;
   });
 }