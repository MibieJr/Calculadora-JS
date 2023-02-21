'use strict';
const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

const calcular = () =>{
    if (operaçaoPendente()){
     const numeroAtual = parseFloat(display.textContent.replace(',','.'));
     novoNumero =true;
     const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
     atualizarDisplay(resultado);
    }
    };

const operaçaoPendente = () => operador !== undefined
let novoNumero = true;
let operador;
let numeroAnterior;

const atualizarDisplay = (texto) => {
    if (novoNumero){
    display.textContent = texto.toLocaleString('BR');
    novoNumero =false}
    else{
        display.textContent += texto;}
    };

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach (numeros => numeros.addEventListener('click',inserirNumero));


const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular()
    novoNumero=true;
    operador = evento.target.textContent;
    numeroAnterior = parseFloat (display.textContent.replace(',','.'));
}
};

operadores.forEach (operador => operador.addEventListener('click',selecionarOperador));

const ativarIgual = () => {
calcular();
operador = undefined
};
document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () => {
    limparDisplay ();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerultimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerultimoNumero);

const inverterSinal = () =>{ 
   novoNumero = true
    atualizarDisplay (display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()){
        if (existeValor()){
            atualizarDisplay (',');
        }else{
            atualizarDisplay('0,');
        }
        }
    }
document.getElementById('decimais').addEventListener('click', inserirDecimal);

const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    '/' : 'operadorDividir',
    '+' : 'operadorSoma',
    '-' : 'operadorDiminuir',
    '*' : 'operadorMultiplicar',
    '=' : 'igual',
    'Enter' : 'igual',
    'Backspace' : 'backspace',
    'c' : 'limparDisplay',
    'Escape' : 'limparCalculo',
    ',' : 'decimal',
}
const mapearTeclado = (evento) => {
   const tecla = evento.key;
   const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
   if (teclaPermitida())   
    document.getElementById(mapaTeclado[tecla]).click();
    console.log(evento)
}
document.addEventListener('keydown',mapearTeclado)