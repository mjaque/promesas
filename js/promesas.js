/**
 *   Descripción principal del fichero.
 *   Descripción secundaria.
 *   @author Miguel Jaque <mjaque@migueljaque.com>
 *   @license GPL-3.0-or-later
 *   Ref: https://spdx.org/licenses/
 *
 *   Ref JSDoc: https://jsdoc.app/
 */
'use strict'

//Una Promesa es un objeto JavaScript
//Se crea con una función (fPromesa)

//La función de la promesa tiene dos funciones
//una para ejecutar cuando la promesa tiene éxito y devuelve un resultado
//y otra para ejecutar cuando la promesa fracasa y devuelve un error
let fPromesa = function(fExito, fFracaso){
  if (Math.random() > 0.5){
    let resultado = 42
    console.log('Hemos tenido éxito.')
    //Llamamos a fExito con el resultado
    fExito(resultado)
  }
  else{
    let error = 'Es el fin del mundo.'
    console.log('Hemos fracasado.')
    //Llamamos a fFracaso con el error
    fFracaso(error)
  }
}

//Ahora que ya tenemos creada la función de la promesa
//CREAMOS la promesa
let promesa = new Promise(fPromesa)

//Ahora podemos usar la promesa
//Para eso le pasamos las funciones que gestionarán el resultado o el error.
let fUsarResultado = function(resultado){
  console.log(`El resultado ha sido ${resultado}`)
}

let fControlarError = function(error){
  console.log(`El error ha sido ${error}`)
}

//Ahora que ya tenemos creadas las funciones que gestionará el resultado o el error,
//USAMOS la promesa
promesa.then(fUsarResultado, fControlarError)

//PERO... no es habitual CREAR promesas
//lo más normal es que obtengamos promesas como resultado de llamar a alguna función

//Por ejemplo, fetch
let promesaFetch = fetch('datos.txt') //Al usar fetch obtenemos una promesa
console.log(promesaFetch) //Este console.log aparecerá antes de que se resuelva la promesa anterior

//Ahora vamos a utilizar la promesa (con funciones flecha)
promesaFetch.then(resultado => {
  console.log(resultado)  //El resultado que obtenemos es de tipo Response (respuesta)
  //Para poder usar la respuesta, tenemos que obtener su texto
  let promesa2 = resultado.text() //el problema es que ¡también devuelve una promesa!
  promesa2.then(resultado => console.log('Por fin tenemos el texto:\n' + resultado))
})

//Pero normalmente lo hacemos "más fácil", aprovechando que podemos "concatenar" promesas
fetch('datos.json')
  .then(respuesta => respuesta.json())
  .then(respuesta =>
      //Aquí obtenemos el objeto del JSON ya traducido
      console.log(respuesta) )
  .catch(error => console.log(`Error: ${error}`)) //al final de la cadena capturamos cualquier error
