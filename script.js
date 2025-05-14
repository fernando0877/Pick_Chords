let arquivosMap = {};

async function carregarLista() {
  const response = await fetch("lista_musicas.json");
  const arquivos = await response.json();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  arquivosMap = {};

  arquivos.sort((a, b) => a.localeCompare(b));

  for (const nome of arquivos) {
    arquivosMap[nome] = "musicas_extraidas/" + nome;

    const item = document.createElement("div");
    item.className = "item-musica";
    item.textContent = nome;
    item.addEventListener("click", () => {
      mostrarCifra(nome);
    });
    lista.appendChild(item);
  }
}

async function mostrarCifra(nome) {
  if (!nome) return;
  const response = await fetch(arquivosMap[nome]);
  const texto = await response.text();
  document.getElementById("painel-direito").textContent = texto;
}

document.addEventListener("DOMContentLoaded", carregarLista);

const select = document.getElementById("lista");
const buscaTitulo = document.getElementById("buscaInput");

function aplicarFiltros() {
  const termoTitulo = buscaTitulo.value.toLowerCase();
  const itens = document.querySelectorAll(".item-musica");

  for (const item of itens) {
    const textoTitulo = item.textContent.toLowerCase();
    item.style.display = textoTitulo.includes(termoTitulo) ? "block" : "none";
  }
}

buscaTitulo.addEventListener("input", aplicarFiltros);

//OCULTAR PAINEL ESQUERDO
function togglePainel() {
  const painelEsquerdo = document.getElementById("painel-esquerdo");
  const painelDireito = document.getElementById("painel-direito");
  const botao = document.getElementById("toggleBtn");

  const painelEsquerdoVisivel = !painelEsquerdo.classList.contains("oculto");

  if (painelEsquerdoVisivel) {
    // Oculta painel esquerdo, mostra o direito
    painelEsquerdo.classList.add("oculto");
    painelDireito.classList.remove("oculto");
    botao.innerHTML = "⯈";
  } else {
    // Mostra painel esquerdo, oculta o direito
    painelEsquerdo.classList.remove("oculto");
    painelDireito.classList.add("oculto");
    botao.innerHTML = "⯇";
  }
}

//registrar aplicativo pra celular
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service_worker.js").then(() => {
    console.log("Service Worker registrado com sucesso");
  });
}
