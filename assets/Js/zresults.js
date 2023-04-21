var key = "8fcadd95"; // store thes api key incase needed else where
var pokeAr;
var pokeTypeAr = [];
var pokeType;
var genre;

// used to assign a movie genre based on the type of pokemon choosen on submit page
var compare = {
    fire: 'drama',
    electric: 'thriller',
    poison: 'comedy',
    dragon: 'fantasy',
    fairy: 'romance',
    steel: 'sciFi',
    ice: 'sciFi',
    flying: 'adventure',
    fighting: 'sports',
    normal: 'action',
    rock: 'western',
    ground: 'western',
    ghost: 'horror',
    dark: 'horror',
    water: 'musical',
    grass: 'musical',
    psychic: 'mystery',
    bug: 'mystery'
};
var movName;

//assigns an index value to be used later when randomly choosing a movie title
var compareInd = {
    drama: 0,
    thriller: 1,
    comedy: 2,
    fantasy: 3,
    romance: 4,
    sciFi: 5,
    adventure: 6,
    sports: 7,
    action: 8,
    western: 9,
    horrow: 10,
    musical: 11,
    mystery: 12
};

var poster;
var plot;
var title;
var titleEl = document.getElementById('movieName');
var posterEl = document.getElementById('poster');
var plotEl = document.getElementById('plot');

// order of indices: drama, thriller, comedy, fantasy, romance, sci-fi, adventure, sports, action, western, horror, musical, mystery
// a nested array of top 20 movies of the above genres
var movList = [
    ['taxi+driver', 'pulp+fiction', 'the+godfather', 'go+now', 'boyhood', "pan's+labyrinth", "what's+eating+gilbert+grape", "billy+elliot", "little+miss+sunshine", "slumdog+millionaire", "sorry+we+missed+you", "mommy", "infernal+affairs", "so+long%2C+my+son", "dearest", "whiplash", "joker", "requiem+for+a+dream", "the+broken+circle+breakdown", "lion"],
    ["identity", "se7en", "fallen", "the+bone+collector", "secret+window", "the+book+of+eli", "deja+vu", "donnie+darko", "sin+city", "pulp+fiction", "kill+bill:+vol.+1", "kill+bill:+vol.+2", "training+day", "the+hateful+eight", "the+call", "the+recruit", "lucky+number+slevin", "shutter+island", "baby+driver", "what+lies+beneath"],
    ["scrooged", "groundhog+day", "friday", "ted", "zombieland", "the+nutty+professor", "the+truman+show", "fear+and+loathing+in+las+vegas", "the+waterboy", "american+pie", "bad+boys", "scary+movie", "bruce+almighty", "the+longest+yard", "the+bucket+list", "tropic+thunder", "big+momma's+house", "movie+43", "22+jump+street", "central+intelligence"],
    ["the+super+mario+bros.+movie", "dungeons+%26+dragons%3A+honor+among+thieves", "barbie", "shazam!+fury+of+the+gods", "the+marvels", "renfield", "avatar:+the+way+of+water", "chupa", "super+mario+bros.", "everything+everywhere+all+at+once", "the+portable+door", "puss+in+boots%3A+the+last+wish”, “the+little+mermaid", "suzume", "shazam!", "peter+pan+%26+wendy", "spider-man%3A+across+the+spider-verse", "harry+potter+and+the+sorcerer's+stone", "avatar", "matilda"],
    ["fools+rush+in", "my+best+friend's+wedding", "while+you+were+sleeping", "you've+got+mail", "p.s.+i+love+you", "simply+irresistible”, “the+wedding+date", "maid+in+manhattan", "keeping+the+faith", "city+of+angels", "fireproof", "three+to+tango", "one+day", "blast+from+the+past", "a+walk+to+remember", "serendipity", "shall+we+dance", "must+love+dogs", "the+age+of+adaline", "the+back-up+plan"],
    ["the+matrix", "inception", "the+truman+show", "alien", "a.i.+artificial+intelligence", "2001%3A+a+space+odyssey", "district+9", "terminator+2%3A+judgment+day", "sunshine", "the+thing", "contact", "star+trek”, “moon”, “back+to+the+future", "minority+report", "jurassic+park", "avatar", "frequency", "equilibrium", "total+recall"],
    ["65", "indiana+jones+and+the+dial+of+destiny", "ant-man+and+the+wasp%3A+quantumania", "guardians+of+the+galaxy+vol.+3", "the+ten+commandments", "the+blue+lagoon", "ghosted", "interstellar", "plane", "black+panther%3A+wakanda+forever", "the+three+museteers%3A+d'artagnan", "dune", "bholaa", "robin+hood%3A+prince+of+thieves", "the+hunger+games”, “gladiator” “jurassic+world%3A+dominion", "ben-hur", "the+lord+of+the+rings%3A+the+fellowship+of+the+ring", "the+expendables+4", "the+princess+bride"],
    ["hoosiers", "rocky", "field+of+dreams", "raging+bull", "million+dollar+baby", "the+fighter", "cinderella+man", "bull+durham", "the+blind+side", "the+natural", "rudy", "remember+the+titans", "seabiscuit", "invictus", "glory+road", "breaking+away", "miracle", "friday+night+lights", "a+league+of+their+own", "the+karate+kid"],
    ["john+wick%3A+chapter+4", "the+last+kingdom%3A+seven+kings+must+die", "operation+fortune%3A+ruse+de+guerre", "murder+mystery+2", "john+wick", "bullet+train", "top+gun%3A+maverick", "the+unbearable+weight+of+massive+talent", "mafia+mamma", "the+batman", "top+gun", "all+quiet+on+the+western+front", "kill+boksoon", "nobody", "the+last+stand", "blade+runner+2049", "sisu", "the+gentlemen", "the+dark+knight", "black+lotus"],
    ["unforgiven", "the+searchers", "the+good%2C+the+bad%2C+the+ugly", "butch+cassidy+and+the+sundance+kid", "once+upon+a+time+in+the+west", "mccabe+%26+mrs+miller", "winchester+'73", "the+man+who+shot+liberty+valance", "pat+garrett+%26+billy+the+kid", "true+grit", "django+unchained", "dead+man", "3%3A10+to+yuma", "high+noon", "the+outlaw+josey+wales", "stagecoach", "red+river", "the+wild+bunch", "johnny+guitar", "tombstone"],
    ["the+strangers", "the+grudge", "the+exorcist", "day+of+the+dead", "paranormal+activity", "the+evil+dead", "rec", "the+shining", "insidious", "session+9", "halloween", "the+thing", "the+hills+have+eyes", "pulse", "28+days+later", "the+crazies", "the+texas+chain+saw+massacre", "the+descent", "case+39", "wolf+creek"],
    ["praise+this", "the+sound+of+music", "grease", "wonka", "guillermo+del+toro's+pinocchio", "the+greatest+showman", "sing+2", "encanto", "moana", "la+la+land", "the+prince+of+egypt", "jesus+christ+superstar", "the+lion+king", "wicked", "roald+dahl's+matilda+the+musical", "aladdin", "easter+parade", "the+wizard+of+oz", "beauty+and+the+beast", "mamma+mia!"],
    ["scream+vi", "murder+mystery", "knives+out", "infinity+pool", "i+see+you", "knock+at+the+cabin", "luther%3A+the+fallen+sun", "nope", "glass+onion", "killers+of+the+flower+moon", "gaslight", "midsommar", "blade+runner+2049", "smile", "scream", "fast+x", "where+the+crawdads+sing", "super+8", "missing", "the+pale+blue+eye"]
];


// grabs the submit page information from the localstorage to be used by the movRandom function
pokeAr = JSON.parse(localStorage.getItem('pokemonData'));
for (var j in pokeAr) {
    pokeTypeAr.push(pokeAr[j].type);
};

// contacts the api to access the title, poster, and plot information for the html
async function getApi() {
    var movieUrl = `http://www.omdbapi.com/?t=${movName}&apikey=${key}`
    await fetch(movieUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            poster = data.Poster;
            title = data.Title;
            plot = data.Plot;
            console.log(data);
            populate()
        })
}
movRandom();
getApi();




// populates the html elements with the follow information
function populate() {
    titleEl.innerHTML = `${title}`;
    posterEl.setAttribute('src', `${poster}`);
    plotEl.innerHTML = `${plot}`
}

// randomly selects a movie title form the above arrays to feed into the API call to allow us to grab information for the movie suggestion
function movRandom() {
    var random = Math.floor(Math.random() * pokeTypeAr.length);
    console.log(random);
    pokeType = pokeTypeAr[random];
    console.log(pokeType);
    genre = compare[pokeType];
    genreId = compareInd[genre]
    var movNum = Math.floor(Math.random() * movList[genreId].length);
    console.log(movList[genreId][movNum]);
    movName = movList[genreId][movNum];

}

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
    pokemonDiv.setAttribute('id', "pokeBox");
    pokemonDiv.setAttribute('class', 'col-6 justify-content-around');

    // Create a new h3 element for the Pokemon name
    const pokemonNameHeading = document.createElement('h3');
    pokemonNameHeading.textContent = pokemonName;
    pokemonDiv.appendChild(pokemonNameHeading);

    // Create a new img element for the Pokemon sprite
    const pokemonSpriteImg = document.createElement('img');
    pokemonSpriteImg.setAttribute('id', 'imgBox');
    pokemonSpriteImg.src = pokemonSpriteUrl;
    pokemonDiv.appendChild(pokemonSpriteImg);

    // Create a new p element for the Pokemon type
    const pokemonTypeParagraph = document.createElement('p');
    pokemonTypeParagraph.setAttribute('id', "typeBox");
    pokemonTypeParagraph.textContent = `Type: ${pokemonType}`;
    pokemonDiv.appendChild(pokemonTypeParagraph);

    // Append the Pokemon div to the container
    pokemonContainer.appendChild(pokemonDiv);
}
