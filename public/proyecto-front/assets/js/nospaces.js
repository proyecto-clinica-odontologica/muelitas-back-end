/*
Esta función no permite el "espace" o espacio
que se hace con la tecla del mismo nombre.
*/ 

function removeSpaces(inputElement){
    inputElement.value = inputElement.value.replace(/\s/g, '');
}