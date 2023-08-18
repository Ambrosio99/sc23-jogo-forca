// Definição inicial do jogo.
const arrayPalavras = ["Escada", "Futebol", "Fralda", "Gato", "Tesoura", "Pular", "Banho", "Piada", "Faca", "Banana", "Chave", "Sapato", "Casa", "Bolsa", "Sorvete", "Cadeira", "Flores", "Livro", "Bateria", "Carro"];
const palavraEscolhida = arrayPalavras[Math.floor(Math.random() * arrayPalavras.length)];
const palavraArray = palavraEscolhida.toUpperCase().split("");
let letrasErradas = [];
let letrasCorretas = [];

// Puxando pra dentro do javascript o input que sera passado as letras e <ul> onde vão ser colocadas as letras em formato de <li>
const letraInput = document.getElementById("inputLetra");
const listaPalavra = document.getElementById("lista-palavra");
const buttonLetra = document.getElementById("inputButton");
const resetGame = document.getElementById("reset-game");

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

// função para receber a letra que é passada no input html ja com verificação caso a pessoa passe numeros
function letraRecebida() {
  let letra = letraInput.value.toUpperCase();
  if (!Number(letra)) {
    verificarLetra(letra);
  } else {
    alert("Digitar somente letras!");
  }
  letraInput.value = "";
}

// Função para verificação da letra, se ela ja foi passada, se está certa ou errada e verificação se ja teve 6 erros.
function verificarLetra(letra) {
  if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) {
    letraJaFoi();
  } else if (palavraArray.includes(letra)) {
    letrasCorretas.push(letra);
    palavraArray.forEach((item, index) => {
      item === letra ? trocarLetra(letra, index) : "";
    });
  } else {
    letrasErradas.push(letra);
    attSpanErros();
    letrasErradas.length === 6 ? elementPerdeu() : "";
  }
  verificarGanhar();
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

// Funções para interação diretamente com o DOM
function elementGanhou() {
  const h1 = document.createElement("h1");
  h1.classList.add("ganhou");
  h1.innerText = "Você ganhou!";
  listaPalavra.appendChild(h1);
  desativarJogo();
}

function elementPerdeu() {
  const h1 = document.createElement("h1");
  h1.classList.add("perdeu");
  h1.innerText = "Você perdeu!";
  listaPalavra.appendChild(h1);
  desativarJogo();
}

function desativarJogo() {
  letraInput.setAttribute("disabled", true);
  buttonLetra.setAttribute("disabled", true);
  return `O jogo acabou, aperte o reset ou atualize a pagina!`;
}

function attSpanErros() {
  const span = document.getElementById("span-erros");
  span.innerText = ` ${letrasErradas.length}`;
  const letras = document.getElementById("letras-erros");
  letras.innerText = letrasErradas;
}

function eventsDom() {
  resetGame.addEventListener("click", () => location.reload());
  letraInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      letraRecebida();
    }
  });
}
eventsDom();

function letraJaFoi() {
  const local = document.getElementById("formForca");
  const p = document.createElement("p");
  p.classList.add("jaFoi");
  p.innerText = "Essa letra ja foi!";
  local.appendChild(p);
}
