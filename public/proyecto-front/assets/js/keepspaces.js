/*
Esta función es para que cuando se haga un space
no mande el cursor a la primera letra de lo que
se estaba escribiendo
*/ 

function preventSpaces(event){
    if(event.key === ' ' || event.keyCode === 32){
        event.preventDefault();
    }
}