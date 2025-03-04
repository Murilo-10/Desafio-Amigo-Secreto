// Lista de nomes adicionados
let nomes = [];
let nomesEmbaralhados = [];
let sorteados = []; // Guarda a ordem de sorteio
let indiceSorteio = 0;

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    let nomeInput = document.getElementById("amigo");
    let nome = nomeInput.value.trim();

    if (nome === "") {
        alert("Adicione um nome!");
        return;
    }

    if (nomes.includes(nome)) {
        alert("Este amigo já foi adicionado!");
        nomeInput.value = "";
        return;
    }

    nomes.push(nome);
    nomeInput.value = "";

    let listaAmigos = document.getElementById("listaAmigos");
    let novoItem = document.createElement("li");
    novoItem.textContent = nome;
    listaAmigos.appendChild(novoItem);
}

function gerarSorteioValido() {
    let valido = false;

    while (!valido) {
        nomesEmbaralhados = [...nomes]; // Copia a lista original
        embaralhar(nomesEmbaralhados); // Embaralha os nomes

        valido = true;
        for (let i = 0; i < nomes.length; i++) {
            if (nomes[i] === nomesEmbaralhados[i]) { 
                valido = false; // Se alguém tirar a si mesmo, refaz o embaralhamento
                break;
            }
        }
    }

    // Define a ordem de sorteio, começando com um nome aleatório
    sorteados = [nomes[Math.floor(Math.random() * nomes.length)]];
    
    // Preenche o restante da ordem, garantindo que cada um tire o próximo
    let restantes = nomes.filter(nome => nome !== sorteados[0]);

    while (restantes.length > 0) {
        let escolhido = restantes.splice(Math.floor(Math.random() * restantes.length), 1)[0];
        sorteados.push(escolhido);
    }

    // O último sorteia o primeiro, fechando o ciclo
    nomesEmbaralhados = [...sorteados.slice(1), sorteados[0]];
}

// Função para embaralhar um array (algoritmo Fisher-Yates)
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Função para sortear um amigo por vez
function sortearAmigo() {
    if (nomes.length < 2) {
        alert("Adicione pelo menos dois amigos para o sorteio.");
        return;
    }

    // Se for o primeiro sorteio, gera a sequência
    if (indiceSorteio === 0) {
        gerarSorteioValido();
    }

    let resultadoLista = document.getElementById("resultado");

    // Se ainda houver pessoas para sortear
    if (indiceSorteio < nomes.length) {
        let novoItem = document.createElement("li");
        novoItem.textContent = `${sorteados[indiceSorteio]} tirou ${nomesEmbaralhados[indiceSorteio]}`;
        resultadoLista.appendChild(novoItem);
        indiceSorteio++;
    } else {
        alert("Todos os amigos já foram sorteados!");
        indiceSorteio = 0; // Reseta para permitir um novo sorteio
        resultadoLista.innerHTML = ""; // Limpa a lista de sorteios anteriores
    }
}
