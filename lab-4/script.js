(()=> {
    const App = {
        htmlElements: {
            fibonnacciForm: document.getElementById("fibonnacci-form"),
            fibonnacciInput: document.getElementById("quantity"), 
            fibonacciResponse: document.getElementById("response"),
        },
        init() {
            App.htmlElements.fibonnacciForm.addEventListener(
                "submit",
                App.handlers.fibonnacciFormSubmitHandler
            );
        },
        handlers: {
            fibonnacciFormSubmitHandler(event){
                event.preventDefault();
                const inputValue = App.htmlElements.fibonnacciInput.value;
                console.log('PRINT INPUT VALUE: ', inputValue);
                App.methods.validateNumber(inputValue);
            }
        },
        methods: {

            validateNumber(number){
                if(number <= 0){
                    window.alert('¡Por favor ingrese un número mayor a 0 !');
                }else{
                    const fibonnacciNumber = App.methods.fibonnacciSequence(number);
                    console.log('PRINT FIBONNACCI SEQUENCE: ', fibonnacciNumber);
                }
            },

            fibonnacciSequence(value) {
                let fibonnacciList = [];
                for (let i = 0; i < value; i++) {
                  if (i < 2) {
                    fibonnacciList.push(i);
                  } else {
                    fibonnacciList.push(fibonnacciList[i - 1] + fibonnacciList[i - 2]);
                  }
                }
                const fibonnacciListItems = document.getElementById("fibonnacci-list");
                fibonnacciListItems.innerHTML = "";
                fibonnacciList.forEach((element, index) => {
                    const item = document.createElement("li");
                    item.textContent = element;
                    item.id = index;
                    item.onclick = function() {
                        console.log('ELEMENTO SELECCIONADO: ', item.id)
                        let confirmAction = confirm("¿Deseas eliminar esta tarjeta?");
                        if (confirmAction) {
                            fibonnacciListItems.removeChild(item)
                        } else {
                          console.log('Cancel button');
                        }
                
                    };
                    console.log('INDEX ELEMENT: ', item);
                    fibonnacciListItems.appendChild(item);
                    item.classList.add("item-list");
                });
                return fibonnacciList;
            },
        },
    };
    App.init();
})();