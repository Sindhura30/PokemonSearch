const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const pokemonHP = document.getElementById('hp');
const pokemonAttack = document.getElementById('attack');
const pokemonDefense = document.getElementById('defense');
const pokemonSpecialAttack = document.getElementById('special-attack');
const pokemonSpecialDefense = document.getElementById('special-defense');
const pokemonSpeed = document.getElementById('speed');
const pokemonImg = document.getElementById('pokemon-img');
const pokemonTypes = document.getElementById('types');
pokemonTypes.innerHTML = '';

const getStat = (stats) => {
  let statObj = {};
  stats.map(item => {
    statObj[item.stat.name] = item.base_stat;
  })
  return statObj;
};


const reset = () => {
  pokemonName.innerHTML = '';
  pokemonId.innerHTML = '';
  pokemonWeight.innerHTML = '';
  pokemonHeight.innerHTML = '';
  pokemonHP.innerHTML = '';
  pokemonAttack.innerHTML = '';
  pokemonDefense.innerHTML = '';
  pokemonSpecialAttack.innerHTML =  '';
  pokemonSpecialDefense.innerHTML =  '';
  pokemonSpeed.innerHTML =  '';
  pokemonImg.innerHTML = '';
  pokemonTypes.innerHTML = '';
}

const updatePokemon = (data) => {
  const {name, id, height, weight, types, stats, sprites} = data;
    const statData = getStat(stats);
    pokemonName.innerHTML = name.toUpperCase();
    pokemonId.innerHTML = id;
    pokemonWeight.innerHTML = weight;
    pokemonHeight.innerHTML = height;
    pokemonHP.innerHTML = statData['hp'];
    pokemonAttack.innerHTML = statData['attack'];
    pokemonDefense.innerHTML = statData['defense'];
    pokemonSpecialAttack.innerHTML =  statData['special-attack'];
    pokemonSpecialDefense.innerHTML =  statData['special-defense'];
    pokemonSpeed.innerHTML =  statData['speed'];
    pokemonImg.innerHTML = `<img src="${sprites.front_default}" id="sprite"/>`;
    pokemonTypes.innerHTML = data.types
    .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
    .join('').toUpperCase();
}

const getPokemon = async () => {
  try {
    let pokemonName = searchInput.value;
    if (typeof (searchInput.value) === 'string') {
      pokemonName = pokemonName.toLowerCase();
    }
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonName}`);
    if (response.status !== 200) {
      alert('Pokémon not found');
      reset();
    } else {
      const data = await response.json();
      updatePokemon(data)
    }
  } catch (e) {
    console.log(e);
    reset();
  }
}

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  getPokemon();
})

