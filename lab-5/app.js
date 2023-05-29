(()=> {
    var inputCount = 0;
    const App = {
        htmlElements: {
            addBtn: document.getElementById("add-btn"),
            gradesForm: document.getElementById("grades-form"),
            gradesInput: document.getElementById("quantity"), 
            gradesResponse: document.getElementById("response"),
        },
        init() {
            App.htmlElements.addBtn.addEventListener(
                "click",
                App.handlers.AddInputHandler
            );
            App.htmlElements.gradesForm.addEventListener(
                "submit",
                App.handlers.gradesFormSubmitHandler
            );
        },
        handlers: {
            AddInputHandler(event){
                event.preventDefault();
                App.methods.addGradeInput();
            },
            gradesFormSubmitHandler(event){
                event.preventDefault();
                App.methods.calculateAverage(event);
            }
        },
        methods: {
            addGradeInput(){
                var container = document.getElementById("input-box");
                var newInput = document.createElement("input");
                var average = document.getElementById("average");
                inputCount++;
                console.log('Input Count', inputCount)
                average.classList.remove("hidden")
                newInput.type = "number";
                newInput.name = "input" + inputCount;
                container.appendChild(newInput);
                container.appendChild(document.createElement("br"));
            },

            calculateAverage(event){
                var form = event.target;
                var inputs = form.getElementsByTagName("input");
                var inputValues = [];
                var inputSum = 0;
                var totalAverage;
                
                for (var i = 0; i < inputs.length; i++) {
                  var input = inputs[i];
                  if (input.type !== "submit") {
                    inputValues.push(input.value)
                    inputSum = inputSum + Number(input.value);
                  }
                }
                totalAverage = inputSum / inputValues.length;
                console.log('SUMA', inputSum);
                console.log('PROMEDIO: ', totalAverage.toFixed(2));
                var result = document.getElementById("result");
                result.innerHTML = `Promedio de notas = ${totalAverage.toFixed(2)}`

            }

        },
    };
    App.init();
})();