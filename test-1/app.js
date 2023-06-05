(()=> {
    var countClick = 0;
    const App = {
        htmlElements: {
            cleanBtn: document.getElementById("cleanBtn"),
            pokeForm: document.getElementById("pokeForm"),
        },
        init() {
            App.htmlElements.cleanBtn.addEventListener(
                "click",
                App.handlers.cleanForm
            );
            App.htmlElements.pokeForm.addEventListener(
                "submit",
                App.handlers.searchPokemon
            );
        },
        handlers: {
            searchPokemon(event){
                event.preventDefault();
                App.methods.searchPokemonApi();
            },
            cleanForm(event){
                event.preventDefault();
                App.methods.cleanPokeForm();
            }
        },
        methods: {
            cleanPokeForm() {
                document.getElementById("pokeForm").reset();
            },

            searchPokemonApi(){
                const inputValue = document.getElementById("name").value;
                const selectValue = document.getElementById("select").value;
                console.log('SEARCHING', inputValue, ' | ', selectValue);
                if(inputValue == '' || selectValue == ''){
                    window.alert('¡Por favor ingrese los campos para continuar!')
                }else{
                    countClick++;
                    var chainList = [];
                    console.log('CONTEO: ', countClick);
                    if(selectValue === 'name'){
                        fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
                        .then(response => response.json())
                        .then(data => {
                            // Handle the API response data
                            console.log('POKEMON: ', data);
                            const name = data.name + ` (${data.id})`;
                            console.log('SPECIES URL', data.species.url);
                            fetch(data.species.url)
                            .then(res => res.json())
                            .then(species =>{
                                console.log('SPECIES', species); 
                                console.log('SPECIES URL', species.evolution_chain.url); 
                                fetch(species.evolution_chain.url)
                                .then(response => response.json())
                                .then(chain =>{
                                    console.log('CHAIN', chain); 
                                    chainList.push({
                                        name: chain.chain.species.name,
                                        isBaby: chain.chain.is_baby
                                    })
                                    chainList.push({
                                        name: chain.chain.evolves_to[0].species.name,
                                        isBaby: chain.chain.evolves_to[0].is_baby
                                    })
                                    chainList.push({
                                        name: chain.chain.evolves_to[0].evolves_to[0].species.name,
                                        isBaby: chain.chain.evolves_to[0].evolves_to[0].is_baby,
                                    })

                                    var pokechain = document.getElementById('list-chain');
                                    console.log(chainList);
                                    chainList.forEach(element => {
                                        const item = document.createElement('li');
                                        console.log('BABYYYYYYYYY', element.isBaby)
                                        if(element.isBaby == true){
                                            var baby = document.createElement("span");
                                            baby.classList.add('material-symbols-outlined'),
                                            baby.textContent = 'child_care'
                                            baby.classList.add('eye');
                                            item.textContent = element.name;
                                            item.appendChild(baby)
                                        }else {
                                            item.textContent = element.name;
                                        }
                                        item.classList.add('capitalize');
                                        pokechain.appendChild(item);
                                    });
                                })
                            })
                            const weightAndHeight = data.weight + ' / ' + data.height;
                            document.getElementById('poke-name').innerHTML = name;
                            document.getElementById('weight-height').innerHTML = weightAndHeight;
                            const sprites = document.getElementById('sprites-img');
                            var spritesFront = document.createElement("img");
                            var spritesBack = document.createElement("img");
                            spritesFront.src = data.sprites.front_default;
                            spritesBack.src = data.sprites.back_default;
                            spritesBack.classList.add('removeBackImg');
                            spritesFront.classList.add('removeBackImg');
                            sprites.appendChild(spritesFront);
                            sprites.appendChild(spritesBack);
                            var pokeName = document.getElementById('pokeName');
                            pokeName.classList.remove('hidden');
    
                            var pokeAbilities = document.getElementById('list-abilities');
                            data.abilities.forEach(element => {
                                const item = document.createElement('li');
                                console.log('HIDDEN', element.is_hidden)
                                if(element.is_hidden == true){
                                    var eye = document.createElement("span");
                                    eye.classList.add('material-symbols-outlined'),
                                    eye.textContent = 'visibility_off'
                                    eye.classList.add('eye');
                                    item.textContent = element.ability.name;
                                    item.appendChild(eye)
                                }else {
                                    item.textContent = element.ability.name;
                                }
                                item.classList.add('capitalize');
                                pokeAbilities.appendChild(item);
                            });
                            
                            var pokeAbility = document.getElementById('pokeAbility');
                            pokeAbility.classList.add('hidden');
                        })
                        .catch(error => {
                            // Handle any errors that occurred during the request
                            console.error('Error:', error);
                        });
                    }else{
                        console.log('ELSE');
                        fetch(`https://pokeapi.co/api/v2/ability/${inputValue}`)
                        .then(response => response.json())
                        .then(data => {
                            // Handle the API response data
                            console.log('ABILITIES: ', data);
                            const abilityTittle = document.getElementById('ability-title');
                            abilityTittle.textContent = data.name;
                            const pokeAbility = document.getElementById('pokeAbility');
                            pokeAbility.classList.remove('hidden');
                            var pokeAbilities = document.getElementById('list');
                            data.pokemon.forEach(element => {
                                const item = document.createElement('li');
                                item.textContent = element.pokemon.name;
                                pokeAbilities.appendChild(item);
                            });
                            const pokeName = document.getElementById('pokeName');
                            pokeName.classList.add('hidden');
                        })
                        .catch(error => {
                            // Handle any errors that occurred during the request
                            console.error('Error:', error);
                        });
                    }
                }
            }
        },
    };
    App.init();
})();