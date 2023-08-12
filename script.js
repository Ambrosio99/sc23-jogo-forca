// Lista de palavras e escolha da palavra transformada em array para inicio do jogo
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

// Puxando pra dentro do html o input que sera passado as letras e <ul> onde vão ser colocadas as letras em formato de <li>
const letraInput = document.getElementById("inputLetra");
const listaPalavra = document.getElementById("lista-palavra");

// Array para guardar quando a letra estiver certa e errada
let letrasErradas = [];
let letrasCorretas = [];

// Função para colcocar dentro do html o numero de letras da palavra em "_"
function palavraToHTML() {
  palavraArray.forEach((letra) => {
    letra = "_";
    const li = document.createElement("li");
    li.innerText = letra;
    listaPalavra.appendChild(li);
  });
}
palavraToHTML();

// função usada dentro do verificarLetra para trocar o "_" pela letra correta
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
// função para receber a letra que é passada no input html ja com verificação caso a pessoa passe numeros
function letraRecebida() {
  let letra = letraInput.value.toUpperCase();
  if (!Number(letra)) {
    verificarLetra(letra);
  } else {
    alert("Digitar somente letras!");
  }
}

// Função para verificação da letra, se ela ja foi passada, se está certa ou errada e verificação se ja teve 6 erros.
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
    letrasErradas.length === 6 ? elementPerdeu() : "";
  }
  verificarGanhar()
}

// Função para verificação se ainda existe algum "_" caso exista retorna true e não faz nada / caso não exista retorna que você ganhou afinal trocou todos por letras.
function verificarGanhar() {
  const liLetra = document.querySelectorAll("#lista-palavra li");
  let seraseGanhou = [];
  liLetra.forEach((item) => {
    seraseGanhou.push(item.innerHTML);
  });
  seraseGanhou.includes("_") ? "" : elementGanhou();
}

// Funções para criar elemento dentro do html avisando quando ganhou ou perdeu.
function elementGanhou() {
  const h1 = document.createElement("h1")
  h1.innerText = "Você ganhou";
  listaPalavra.appendChild(h1);
}
function elementPerdeu() {
  const h1 = document.createElement("h1")
  h1.innerText = "Você perdeu";
  listaPalavra.appendChild(h1);
}