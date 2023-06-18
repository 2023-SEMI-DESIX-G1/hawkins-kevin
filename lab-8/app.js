const express = require("express");
const axios = require('axios');
const app = express();

const PORT = 3000;
let pokeName;

app.get("/", function (req, res) {
  res.json({
    message: "Hello World! from lab8/app.js",
  });
});

app.get("/:pokemon", function (req, res) {
  pokeName = req.params.pokemon;   
  //Calling POKE API
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        .then(response => {
            const responseData = response.data;
            const body = {
                id: responseData.id,
                name: responseData.name,
                height: responseData.height,
                weight: responseData.weight,
                abilities: [],
                evolution: [],
            }
            // console.log(responseData);

            responseData.abilities.forEach(ability => {
                body.abilities.push({
                    name: ability.ability.name,
                    is_hidden: ability.is_hidden
                });

            });
            // console.log(body);
        axios.get(responseData.species.url)
            .then(species => {
                    // console.log(species.data);
                    axios.get(species.data.evolution_chain.url)
                    .then(chain => {
                            // console.log(chain.data);
                            // console.log(chain.data.chain.species.name);
                            body.evolution.push({
                                name: chain.data.chain.species.name,
                                is_baby: chain.data.chain.is_baby
                            });
                            var evolvesTo = chain.data.chain;
                            // console.log('EVOLUTION',evolvesTo);
                            // console.log('LENGTH',evolvesTo.evolves_to.length);
                            while (evolvesTo) {
                                if (evolvesTo.evolves_to.length > 0) {
                                    // console.log('EVOLUTION',evolvesTo);
                                    evolvesTo = evolvesTo.evolves_to[0];
                                    body.evolution.push({
                                        name: evolvesTo.species.name,
                                        is_baby: evolvesTo.is_baby
                                    }); 
                                } else {
                                    evolvesTo = null;
                                }
                            }
                            console.log('POKEMON = ', body);
                            res.json(body);
                        })
                        .catch(error => {
                            console.error(error.message);
                            if(error.response.statusText === 'Not Found'){
                                res.json({
                                    message: 'Evolution chain not found!'
                                });
                            }
                        }
                    );
                })
                .catch(error => {
                    console.error(error.message);
                    if(error.response.statusText === 'Not Found'){
                        res.json({
                            message: 'Species not found!'
                        });
                    }
                }
            );
        })
        .catch(error => {
            console.error(error.message);
            if(error.response.statusText === 'Not Found'){
                res.json({
                    message: 'Pokemon not found!'
                });
            }
        }
    );

});

app.listen(PORT, () => {
  console.log(`SERVE ON PORT: ${PORT}.`);
});