const axios = require('axios');

module.exports = {
  async get(url) {
    try {
      console.log('GET URL:', url);
      const response = await axios.get(url);
      const responseData = response.data;
      const body = {
        id: responseData.id,
        name: responseData.name,
        height: responseData.height,
        weight: responseData.weight,
        abilities: [],
        evolution: [],
      };
  
      responseData.abilities.forEach(ability => {
        body.abilities.push({
          name: ability.ability.name,
          is_hidden: ability.is_hidden,
        });
      });
  
      const species = await axios.get(responseData.species.url);
      const chain = await axios.get(species.data.evolution_chain.url);
  
      body.evolution.push({
        name: chain.data.chain.species.name,
        is_baby: chain.data.chain.is_baby,
      });
  
      let evolvesTo = chain.data.chain;
      while (evolvesTo.evolves_to.length > 0) {
        evolvesTo = evolvesTo.evolves_to[0];
        body.evolution.push({
          name: evolvesTo.species.name,
          is_baby: evolvesTo.is_baby,
        });
      }
  
      console.log('POKEINFO:', body);
      return body; // Return the body object when finished
    } catch (error) {
      console.error(error);
    }
  },

  async post(url, data) {
    const rawResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return rawResponse.json();
  },
};