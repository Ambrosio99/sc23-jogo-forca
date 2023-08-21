// Arquivos DOM
const listaPalavra = document.getElementById("lista-palavra");
const buttonLetra = document.getElementById("inputButton");
const letraInput = document.getElementById("inputLetra");

// Definição inicial do jogo.
const arrayPalavras = [
  { dica: "Tecnologia", palavras: ["Computador", "Internet", "Celular", "Software"] },
  { dica: "Fruta", palavras: ["Banana", "Abacaxi", "Uva", "Morango", "Melancia", "Laranja"] },
  { dica: "Meio de Transporte", palavras: ["Carro", "Bicicleta", "Navio", "Moto"] },
  { dica: "Animal", palavras: ["Raposa", "Gato", "Cachorro", "Coelho", "Pato", "Elefante"] },
  { dica: "Cor", palavras: ["Laranja", "Branco", "Vermelho", "Preto", "Azul", "Cinza", "Amarelo", "Verde"] },
];
const arrayEscolhida = arrayPalavras[Math.floor(Math.random() * arrayPalavras.length)];
const palavraEscolhida = arrayEscolhida.palavras[Math.floor(Math.random() * arrayEscolhida.palavras.length)];
const palavraArray = palavraEscolhida.toUpperCase().split("");
let letrasErradas = [];
let letrasCorretas = [];

function palavraToHTML() {
  palavraArray.forEach((letra) => {
    letra = "_";
    const li = document.createElement("li");
    li.innerText = letra;
    listaPalavra.appendChild(li);
  });
}
palavraToHTML();

function letraRecebida() {
  let letra = letraInput.value.trim().toUpperCase();
  if (!letra) {
    msgAlert(1);
  } else if (!Number(letra)) {
    verificarJogo(letra);
  } else {
    msgAlert(2);
  }
}

function verificarJogo(letra) {
  if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) {
    msgAlert(3);
  } else if (palavraArray.includes(letra)) {
    letrasCorretas.push(letra);
    palavraArray.forEach((item, index) => {
      item === letra ? trocarLetra(letra, index) : "";
    });
    attSpan();
  } else {
    letrasErradas.push(letra);
    attSpan();
    letrasErradas.length === 6 ? perdeuOuGanhou("perdeu") : "";
    trocarImg();
  }
  verificarGanhar();
}

function verificarGanhar() {
  const liLetra = document.querySelectorAll("#lista-palavra li");
  let seraseGanhou = [];
  liLetra.forEach((item) => {
    seraseGanhou.push(item.innerHTML);
  });
  seraseGanhou.includes("_") ? "" : perdeuOuGanhou("ganhou");
}

// Funções para interação diretamente com o DOM
function eventsDom() {
  const resetGame = document.getElementById("reset-game");
  resetGame.addEventListener("click", () => location.reload());

  letraInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      letraRecebida();
      letraInput.value = "";
    }
  });
}
eventsDom();

function trocarImg() {
  const allimg = document.querySelectorAll(".box01 img");
  allimg.forEach((img) => {
    const src = img.src;
    const partSrc = src.split("/");
    const srcimg = partSrc.find((item) => item.startsWith("img-"));
    if (!srcimg.includes(letrasErradas.length)) {
      img.classList.add("displayOff");
    } else {
      img.classList.remove("displayOff");
    }
  });
}
trocarImg();

function trocarLetra(letra, index) {
  const liLetra = document.querySelectorAll("#lista-palavra li");
  liLetra[index].innerHTML = letra;
}

function msgAlert(i) {
  const local = document.getElementById("formForca");
  const p = document.createElement("p");
  switch (i) {
    case 1:
      p.innerText = `Digite uma letra antes de enviar!`;
      p.classList.add("antesEnviar");
      break;
    case 2:
      p.innerText = `Digitar somente letras!`;
      p.classList.add("somenteLetras");
      break;
    case 3:
      p.classList.add("jaFoi");
      p.innerText = `A letra "${letraInput.value.toUpperCase()}" já foi`;
      break;
  }
  local.appendChild(p);
  setTimeout(() => {
    local.removeChild(p);
  }, 2000);
}

function attSpan() {
  const span = document.getElementById("span-erros");
  span.innerText = ` ${letrasErradas.length}`;

  const letras = document.getElementById("letras-erros");
  let letraJaFoi = letrasCorretas.concat(letrasErradas);
  letras.innerText = letraJaFoi;

  const spanDica = document.getElementById("spanDica");
  spanDica.innerText = ` ${arrayEscolhida.dica} com ${palavraEscolhida.length} letras`;
}
attSpan();

function dificuldade() {
  const localdiff = document.querySelector(".box02");
  const pdiff = document.createElement("p");
  if (palavraEscolhida.length <= 4) {
    pdiff.innerText = `Nivel Fácil`;
    pdiff.classList.add("diff-facil");
  } else if (palavraEscolhida.length <= 7) {
    pdiff.innerText = `Nível Médio`;
    pdiff.classList.add("diff-medio");
  } else {
    pdiff.innerText = `Nível Difícil`;
    pdiff.classList.add("diff-hard");
  }
  localdiff.appendChild(pdiff);
}
dificuldade();

function perdeuOuGanhou(condit) {
  const h1 = document.createElement("h1");
  if (condit === "ganhou") {
    h1.classList.add("ganhou");
    h1.innerText = "Você ganhou!";
  } else {
    h1.classList.add("perdeu");
    h1.innerText = "Você perdeu!";
    palavraEra();
  }
  listaPalavra.appendChild(h1);
  letraInput.setAttribute("disabled", true);
  buttonLetra.setAttribute("disabled", true);
}

function palavraEra() {
  const local = document.getElementById("formForca");
  const p = document.createElement("p");
  p.classList.add("palavraEra");
  p.innerText = `A palavra era: ${palavraEscolhida}`;
  local.appendChild(p);
}
