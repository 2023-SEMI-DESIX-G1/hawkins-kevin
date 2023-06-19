const express = require("express");
const { pokemon } = require("./utils");
const { get } = require("./remote");
const axios = require('axios');
const app = express();

app.get("/", function (req, res) {
    res.json({
      message: "Laboratorio #9",
    });
});

app.get("/cache", async (req, res) => {
    console.log('CACHE');
    res.json(pokemon.getCache());
});

  
app.get("/:id", async (req, res) => {
    console.log('INFO: ', req.params);
    const { id } = req.params;  
    const response = await pokemon.get(id);
    if(response == undefined){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
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
                            // console.log('POKEMON = ', body);
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
    }
    res.json(response);
});

app.listen(3000, () => {
  console.log(`SERVE ON PORT: ${3000}`);
});