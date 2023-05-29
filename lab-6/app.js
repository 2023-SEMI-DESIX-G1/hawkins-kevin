const { type } = require('os');
const  readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Ingrese un número para realizar secuencia Fibonnacci: \n', function(rta) {
    const number = Number(rta);
    // console.log('Tipo: ', typeof rta);
    if (isNaN(number)) {
      console.log(`El valor ingresado '${rta}' no es de tipo numérico, por favor ingrese un número!`);
      rl.close();
    } else {
      console.log('Valor ingresado:', number);
      let fibonnacciList = [];
      for (let i = 0; i < number; i++) {
        if (i < 2) {
          fibonnacciList.push(i);
        } else {
          fibonnacciList.push(fibonnacciList[i - 1] + fibonnacciList[i - 2]);
        }
      }
      console.log(fibonnacciList);
      rl.close();
    }
});