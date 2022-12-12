
const valorInput = document.getElementById('select_id')
const valorButton = document.getElementById('boton_id')
const containerOculto= document.getElementById('container__oculto')

const apiURL= `https://pokeapi.co/api/v2/pokemon`

let isFetching = false;

const fetchPokemons = async () => {
    const response = await fetch(`${apiURL}?offset=0&limit=20`)
    const data = await response.json()
    return data;
}

const mensajeErrorHtml = (mensaje) => {
    return `
    <div class="container__card" id="container__card">
        <p> ${mensaje} </p>
    </div>
    `
}


const getPokemonHtml =({id, name, sprites, height, weight, types}) => {
    return `
    <div class="container__card" id="container__card">
                <div class="top__card">
                    <img src="${sprites.other.home.front_default}"/>
                    <h2>${name.toUpperCase()}</h2>
                </div>
                <div class="mid__card">
                    ${types
                        .map((tipo) => {
                            return `<span> ${tipo.type.name.toUpperCase()}</span> `
                        }).join("")}
                </div>
                <div class="bot__card">
                    <p>Su altura es de ${height / 10}m</p>
                    <p>Pesa ${weight / 10}kg</p>
                </div>
            </div>
    
    `
}

const validarId =  (info)  => {
    
    if ((parseInt(valorInput.value) > 0) || (parseInt(valorInput.value) <21)) {
        renderPokemon(info)
        console.log("1")
    }
    /*else if (isNaN(valorInput.value)) {
        console.log("2")
        containerOculto.innerHTML = mensajeErrorHtml("Error, no ingresaste ningun numero")
    }
    else if (((parseInt(valorInput.value)) < 0) || ((parseInt(valorInput.value)) > 20))
        console.log("3")
        containerOculto.innerHTML = mensajeErrorHtml("Error, el numero ingresado no coincide a ningun pokemon")*/
    }
 
const renderPokemon= pokemonList => {
    const cardsHtml = pokemonList.find(pokemon=> (pokemon).id=== parseInt(valorInput.value))
    
    containerOculto.innerHTML= getPokemonHtml(cardsHtml)
}




function init() {
    valorButton.addEventListener(`click`, async (e)=>{
        e.preventDefault();
        const {results} = await fetchPokemons()
        
        
        const URLS = results.map(pokemon =>pokemon.url)
        
        const infoPokemones = await Promise.all(
            URLS.map(async url=> {
                const nextPokemon = await fetch(url);
                return await nextPokemon.json()
            })
        )
        
        validarId(infoPokemones)

            





    })
} 
 

init()