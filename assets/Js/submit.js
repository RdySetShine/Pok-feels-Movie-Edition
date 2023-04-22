const pokemonCount = 151;
var pokedex = {}; // {1}
async function getPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
  let res = await fetch(url);
  let pokemon = await res.json();
  console.log(pokemon);
  let pokemonName = pokemon["name"];
  let pokemonType = pokemon["types"];
  let pokemonImg = pokemon["sprites"]["front_default"];
  res = await fetch(pokemon["species"]["url"]);
  let pokemonDesc = await res.json();
  // console.log(pokemonDesc);
  pokemonDesc = pokemonDesc["flavor_text_entries"]["9"]["flavor_text"];
  pokedex[num] = {
    name: pokemonName,
    img: pokemonImg,
    types: pokemonType,
    desc: pokemonDesc,
  };
}
function updatePokemon(num) {
  console.log(pokedex[num]);
  document.getElementById("pokemon-img").src = pokedex[num]["img"];
  let typesDiv = document.getElementById("pokemon-types");
  while (typesDiv.firstChild) {
    typesDiv.firstChild.remove(); // when you have a div with child then it get removed
  }
  let pokemonDesc = pokedex[num]["desc"];
  let descDiv = document.getElementById("pokemon-description");
  descDiv.innerText = pokemonDesc;
  let types = pokedex[num]["types"];
  for (let i = 0; i < types.length; i++) {
    let type = document.createElement("span");
    type.innerText = types[i]["type"]["name"].toUpperCase();
    type.classList.add("type-box");
    type.classList.add(types[i]["type"]["name"]);
    typesDiv.append(type);
    console.log(type);
    console.log(typesDiv);
  }
}
window.onload = async function () {
  // getPokemon(1);
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
    let pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.innerText = i.toString() + "." + pokedex[i]["name"].toUpperCase();
    pokemon.classList.add("pokemon-name");
    pokemon.addEventListener("click", () => updatePokemon(i));
    document.getElementById("pokemon-list").append(pokemon);
  }
  document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];
  // console.log(pokedex);
};

// Get submit button element
const submitBtn = document.getElementById('submit');

// Add click event listener to submit button
submitBtn.addEventListener('click', async function(event) {
    event.preventDefault();

    // Get all Pokemon inputs
    const pokeInputs = document.querySelectorAll('.pokeName');

    // Create an object to store Pokemon data
    const pokemonData = {};

    // Loop through each Pokemon input
    for (let i = 0; i < pokeInputs.length; i++) {
        // Get Pokemon name value and convert to lowercase
        const pokeName = pokeInputs[i].value.toLowerCase();

        // Fetch Pokemon data from API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
        const data = await response.json();

        // Extract Pokemon type and sprite URL from API response
        const pokeType = data.types[0].type.name; // Assumes only one type per Pokemon, modify as needed
        const pokeSpriteUrl = data.sprites.front_default;

        // Add Pokemon name, type, and sprite URL as key-value pairs to the object
        pokemonData[pokeName] = {
            type: pokeType,
            spriteUrl: pokeSpriteUrl
        };
    }

    // Store Pokemon data in local storage
    localStorage.setItem('pokemonData', JSON.stringify(pokemonData));

    // Redirect to zresults.html
    window.location.href = './zresults.html';
});




