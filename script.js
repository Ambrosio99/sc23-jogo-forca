// Lista de palavras e escolha para inicio do jogo
const arrayPalavras = [
  "Escada",
  "Futebol",
  "Fralda",
  "Gato",
  "Tesoura",
  "Pular",
  "Banho",
  "Piada",
  "Faca",
  "Banana",
  "Chave",
  "Sapato",
  "Casa",
  "Bolsa",
  "Sorvete",
  "Cadeira",
  "Flores",
  "Livro",
  "Bateria",
  "Carro",
];
const palavraEscolhida =
  arrayPalavras[Math.floor(Math.random() * arrayPalavras.length)];
const palavraArray = palavraEscolhida.toUpperCase().split("");

const letraInput = document.getElementById("inputLetra");
const listaPalavra = document.getElementById("lista-palavra");

let letrasErradas = [];
let letrasCorretas = [];

// Colocando a palavra dentro do html em _ e trocar por letra correta
function palavraToHTML() {
  palavraArray.forEach((letra) => {
    letra = "_";
    const li = document.createElement("li");
    li.innerText = letra;
    listaPalavra.appendChild(li);
  });
}
palavraToHTML();

function trocarLetra(letra, index) {
  const liLetra = document.querySelectorAll("#lista-palavra li");
  liLetra[index].innerHTML = letra;
}

// Receber letra do html para javascript com Click e Enter
letraInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    letraRecebida();
  }
});
function letraRecebida() {
  let letra = letraInput.value.toUpperCase();
  if (!Number(letra)) {
    verificarLetra(letra);
  } else {
    alert("Digitar somente letras!");
  }
}

function verificarLetra(letra) {
  if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) {
    alert("Essa letra ja foi");
  } else if (palavraArray.includes(letra)) {
    letrasCorretas.push(letra);
    palavraArray.forEach((item, index) => {
      item === letra ? trocarLetra(letra, index) : "";
    });
  } else {
    letrasErradas.push(letra);
    letrasErradas.length === 6 ? alert("Você perdeu!") : "";
  }
  verificarGanhar();
}

function verificarGanhar() {
  const liLetra = document.querySelectorAll("#lista-palavra li");
  let seraseGanhou = [];
  liLetra.forEach((item) => {
    seraseGanhou.push(item.innerHTML);
  });
  seraseGanhou.includes("_") ? "" : alert("VOCÊ GANHOU!!!!");
}
