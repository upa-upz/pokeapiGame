const container = document.getElementById('main');
const button = document.getElementById('btn')

// es asqueroso el codigo pero funciona... 

//Generar un id de Pokemon aleatorio
let radndomId = Math.floor((Math.random() * 150)+1);

//variables globales
let pokeName;
let img;

//consulta a la Pokeapi
function consultarPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(function (response){
        response.json()
        .then(function (pokemon){
            console.log(pokemon)
            crearPokemon(pokemon)
        });
    });
}

function crearPokemon(pokemon) {
    img = container.querySelector('#img');
    img.setAttribute("src", pokemon.sprites.other["official-artwork"].front_default);
    pokeName = pokemon.name;
    return (pokeName, img)
}

//Evento Jugar
button.addEventListener('click', () => {
    console.log('click'); 

    let time = 15;

    container.innerHTML = `<img class="img" id="img" src="">
    <h2 class="h2" id="h2">?</h2><span class="span" id="timeSpan">${time}</span>`

    consultarPokemon(radndomId);
    
    let temporizador = setInterval(() => {

        if(time === 0){
            clearInterval(temporizador);
            let name = document.getElementById('h2');
            name.className += " h2-rotate";
            name.innerHTML = `Es ${pokeName.toUpperCase()} !!!` 
            let setImg = document.getElementById('img');
            setImg.className = "img-desactive";
        }else{
            time -= 1;
            let el = document.getElementById('timeSpan')
            el.innerHTML =`<span class="span" id="timeSpan">${time}</span>`
            console.log(time) 
        }
    }, 1000);

});