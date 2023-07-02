const cache = require("./cache");
const { get } = require("./remote");

module.exports = {
  pokemon: {

    getCache() {
      return cache;
    },

    getPokemonStructure({ pokemon, fromCache = false }) {
      return {
        fromCache,
        pokemon,
      };
    },

    getPokemonUrl(pokemon) {
      console.log('getPokemonUrl');
      return `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    },

    async get(pokemonId) {
      let fromCache, pokemon;
      console.log('GET POKEMON ID: ', pokemonId);
      console.log('POKEMON CACHE: ', cache[pokemonId]);
      if (cache[pokemonId]) {
        pokemon = cache[pokemonId];
        fromCache = true;
      } else {
        const url = this.getPokemonUrl(pokemonId);
        console.log('URL: ', url);
        pokemon = await get(url);
        this.set(pokemonId, pokemon);
        fromCache = false;
      }
      return this.getPokemonStructure({
        pokemon,
        fromCache,
      });
    },

    set(pokemonId, data) {
      cache[pokemonId] = data;
    },
  },
};