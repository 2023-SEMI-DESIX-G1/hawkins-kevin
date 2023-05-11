(() => {
    const App = {
        htmlElements : {
            palindromo: document.getElementById("palindromoForm"),
            palindromoInput: document.getElementById("palindromo"),
            cantidadDeCaracteres: document.getElementById("cantidadForm"),
            cantidadInput: document.getElementById("cantidad"),
            añoBisiesto: document.getElementById("añoForm"),
            añoInput: document.getElementById("año"),
            sumatoria: document.getElementById("sumatoriaForm"),
            sumatoriaInput: document.getElementById("sumatoria"),
        },
        init(){
            App.htmlElements.palindromo.addEventListener(
                "submit",
                App.handlers.palindromoFormSubmitHandler
            );
            App.htmlElements.cantidadDeCaracteres.addEventListener(
                "submit",
                App.handlers.cantidadFormSubmitHandler
            );

            App.htmlElements.añoBisiesto.addEventListener(
                "submit",
                App.handlers.añoBisiestoFormSubmitHandler
            );

            App.htmlElements.sumatoria.addEventListener(
                "submit",
                App.handlers.sumatoriaFormSubmitHandler
            );
            // console.log({App})
        },
        handlers:{
            palindromoFormSubmitHandler(event) {
                event.preventDefault();
                const obtenerPalindromoValue = App.htmlElements.palindromoInput.value;
                console.log('obtenerPalindromoValue: ', obtenerPalindromoValue);
                const palindromoNumber = App.methods.getPalindromo(obtenerPalindromoValue)
            },

            cantidadFormSubmitHandler(event) {
                event.preventDefault();
                const obtenerCantidadValue = App.htmlElements.cantidadInput.value;
                console.log('obtenerCantidadValue: ', obtenerCantidadValue);
                const cantidadString = App.methods.getCantidad(obtenerCantidadValue)
            },


            añoBisiestoFormSubmitHandler(event) {
                event.preventDefault();
                const obtenerAñoValue = App.htmlElements.añoInput.value;
                console.log('obtenerañoValue: ', obtenerAñoValue);
                const añoNumber = App.methods.getAño(obtenerAñoValue)
            },

            sumatoriaFormSubmitHandler(event) {
                event.preventDefault();
                const obtenerSumatoriaValue = App.htmlElements.sumatoriaInput.value;
                console.log('obtenerSumatoriaValue: ', obtenerSumatoriaValue);
                const sumatoriaNumber = App.methods.getSumatoria(obtenerSumatoriaValue)
            },
        },
        methods: {
            getPalindromo(obtenerPalindromo) {
                var numero = obtenerPalindromo.toString();
                var numeroReverse = numero.split("").reverse().join("");
                if (numero === numeroReverse) {
                  var numero2 = obtenerPalindromo.toString(2);
                  var numeroReverse2 = numero2.split("").reverse().join("");
                  if (numero2 === numeroReverse2) {
                    console.log("El número ingresado SI es palíndromo de doble base");
                  } else {
                    console.log("El número ingresado NO es palíndromo en base 2");
                  }
                } else {
                    console.log("El número ingresado NO es palíndromo en base 10");
                }
            },

            getCantidad(obtenerCantidadValue){
                const resultado = {};
                const palabra = obtenerCantidadValue.toLowerCase().split('');
                for (let i = 0; i < palabra.length; i++) {
                  if (resultado[palabra[i]]) {
                    resultado[palabra[i]]++;
                  } else {
                    resultado[palabra[i]] = 1;
                  }
                }
                console.log("La palabra " + "'" + obtenerCantidadValue + "'" + " posee la siguiente cantidad de caracteres: ", resultado)
            },


            getAño(obtenerAñoValue){
                const fecha = new Date(obtenerAñoValue);
                const año = fecha.getFullYear();
                console.log('AÑO: ', año);
                if ((año % 4 == 0 && año % 100 != 0) || año % 400 == 0) {
                    console.log('El año ingresado SI es una año bisiesto');
                } else {
                    console.log('El año ingresado NO es una año bisiesto');
                }
            },

            getSumatoria(obtenerSumatoriaValue){
                let primos = [];
                let esPrimo;
                for (let i = 2; i <= obtenerSumatoriaValue; i++) {
                  esPrimo = true;
                  for (let j = 2; j < i; j++) {
                    if (i % j === 0) {
                      esPrimo = false;
                      break;
                    }
                  }
                  if (esPrimo) {
                    primos.push(i);
                  }
                }
                console.log('Sumatoria de números primos: ', primos.reduce((acc, curr) => acc + curr, 0) + 1);
            }
        },
    };
    App.init();
})();