/*// Get submit button element
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
        // Get Pokemon name value
        const pokeName = pokeInputs[i].value;

        // Fetch Pokemon type data from API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
        const data = await response.json();

        // Extract Pokemon type from API response
        const pokeType = data.types[0].type.name; // Assumes only one type per Pokemon, modify as needed

        // Add Pokemon name and type as key-value pairs to the object
        pokemonData[pokeName] = pokeType;
    }

    // Store Pokemon data in local storage
    localStorage.setItem('pokemonNames', JSON.stringify(Object.keys(pokemonData)));
    localStorage.setItem('pokemonTypes', JSON.stringify(Object.values(pokemonData)));

    // Redirect to zresults.html
    window.location.href = './zresults.html';
});*/

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
        // Get Pokemon name value
        const pokeName = pokeInputs[i].value;

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



