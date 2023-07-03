const cache = require("./cache");
const { get } = require("./remote");
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tzjiboizxebkjrqnymod.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6amlib2l6eGVia2pycW55bW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgzNDQzMzIsImV4cCI6MjAwMzkyMDMzMn0.18WZlVpWQKQd-3OvIiGgvkrEj5NWc78nL6BcjlUi8Q8';

const supabase = createClient(supabaseUrl, supabaseKey);


function getCurrentTimestamp() {
  return Math.floor(Date.now() / 1000);
}

function isCacheEntryValid(cacheItem) {
  const currentTimestamp = getCurrentTimestamp();
  return cacheItem.timestamp + 300 >= currentTimestamp;
}

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
      let fromCache, pokemon;
      if (cache[pokemonId]  && isCacheEntryValid(cache[pokemonId])) {
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
      cache[pokemonId] = {
        data,
        timestamp: getCurrentTimestamp(),
      };
      setTimeout(() => {
        this.delete(pokemonId);
      },  5 * 60 * 1000);
    },

    delete(pokemonId) {
      delete cache[pokemonId];
      console.log(`Pokemon deleted: ${pokemonId}`);
    },
  },
};