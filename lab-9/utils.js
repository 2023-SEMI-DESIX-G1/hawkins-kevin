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
      return `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    },
    async get(pokemonId) {
      console.log('--------------------id: ', pokemonId);
      let fromCache, pokemon;
      if (cache[pokemonId]) {
        pokemon = cache[pokemonId];
        fromCache = true;
      } else {
        const url = this.getPokemonUrl(pokemonId);
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