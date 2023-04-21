// Get the Pokemon data from local storage
const pokemonData = JSON.parse(localStorage.getItem('pokemonData'));

// Get the container element to display the Pokemon
const pokemonContainer = document.getElementById('pokemonContainer');

// Loop through each Pokemon and create a new element to display its name, sprite, and type
for (const pokemonName in pokemonData) {
  const pokemonType = pokemonData[pokemonName].type;
  const pokemonSpriteUrl = pokemonData[pokemonName].spriteUrl;

  // Create a new div element for the Pokemon
  const pokemonDiv = document.createElement('div');
  pokemonDiv.classList.add('pokemon');

  // Create a new h3 element for the Pokemon name
  const pokemonNameHeading = document.createElement('h3');
  pokemonNameHeading.textContent = pokemonName;
  pokemonDiv.appendChild(pokemonNameHeading);

  // Create a new img element for the Pokemon sprite
  const pokemonSpriteImg = document.createElement('img');
  pokemonSpriteImg.src = pokemonSpriteUrl;
  pokemonDiv.appendChild(pokemonSpriteImg);

  // Create a new p element for the Pokemon type
  const pokemonTypeParagraph = document.createElement('p');
  pokemonTypeParagraph.textContent = `Type: ${pokemonType}`;
  pokemonDiv.appendChild(pokemonTypeParagraph);

  // Append the Pokemon div to the container
  pokemonContainer.appendChild(pokemonDiv);
}
