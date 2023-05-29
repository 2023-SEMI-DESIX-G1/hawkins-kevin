(()=> {
    var inputCount = 0;
    var inputKeys = [];
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
                newInput.classList.add('mx-2');
                var name = 'Nota ' + inputCount;
                inputKeys.push(name);
                console.log('LABELS: ', inputKeys)
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
                    inputValues.push(Number(input.value))
                    inputSum = inputSum + Number(input.value);
                  }
                }
                totalAverage = inputSum / inputValues.length;
                console.log('SUMA', inputSum);
                console.log('LISTA: ', inputValues);
                console.log('PROMEDIO: ', totalAverage.toFixed(2));
                var result = document.getElementById("result");
                result.innerHTML = `Promedio de notas = ${totalAverage.toFixed(2)}`


                var data = {
                    labels: inputKeys,
                    datasets: [{
                      label: "Grafica de notas",
                      data: inputValues,
                      backgroundColor: "rgba(0, 123, 255, 0.5)", // Bar color
                      borderColor: "rgba(0, 123, 255, 1)", // Border color
                      borderWidth: 1 // Border width in pixels
                    }]
                };

                var options = {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                };

                var ctx = document.getElementById("graphic").getContext("2d");
                var myChart = new Chart(ctx, {
                    type: "bar",
                    data: data,
                    options: options
                });

            }

        },
    };
    App.init();
})();