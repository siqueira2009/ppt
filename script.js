let vitoriasJogador = 0;
let vitoriasMaquina = 0;

function escolherJogada() {
    let opcoesJogador = document.querySelectorAll('#opcoesJogador .opcao');
    let goBtn = document.getElementById('jogarBtn')

    goBtn.setAttribute('disabled', '')

    Array.from(opcoesJogador).forEach(opt => {
        opt.addEventListener('click', () => {
            Array.from(opcoesJogador).forEach(opt => {
                opt.classList.remove('selecionado');
            })
            goBtn.removeAttribute('disabled');
            goBtn.setAttribute('onclick', 'jogar()')
            opt.classList.add('selecionado');
        })
    })
}

function jogar() {
    let opcoesMaquina = document.querySelectorAll('#opcoesInimigo .opcao')

    let sorteado = Math.floor(Math.random() * 3);
    opcoesMaquina[sorteado].classList.add('selecionado');

    definirGanhador()
}

function definirGanhador() {
    let ganhador;

    let valorJogador = document.querySelector('#opcoesJogador .selecionado').getAttribute('valor');
    let valorMaquina = document.querySelector('#opcoesInimigo .selecionado').getAttribute('valor');
    let primeirasLetras = valorJogador.charAt(0) + valorMaquina.charAt(0);
    let resultText = document.getElementById("resultText");
    let goBtn = document.getElementById('jogarBtn');
    let restartBtn = document.getElementById('restartBtn');
    let game = document.getElementById("game")

    console.log(primeirasLetras)

    if (valorJogador == valorMaquina) {
        ganhador = "empate"
    } else if (primeirasLetras == "rt") {
        ganhador = "jogador"
    } else if (primeirasLetras == "tr") {
        ganhador = "maquina"
    } else if (primeirasLetras == "pr") {
        ganhador = "jogador"
    } else if (primeirasLetras == "rp") {
        ganhador = "maquina"
    } else if (primeirasLetras == "tp") {
        ganhador = "jogador"
    } else if (primeirasLetras == "pt") {
        ganhador = "maquina"
    } else {
        ganhador = "erro"
    }

    if (ganhador == "empate") {
        resultText.innerHTML = "🤝 Empate!"
    } else if (ganhador == "jogador") {
        resultText.innerHTML = "🧑 Jogador venceu!"
    } else if (ganhador == "maquina") {
        resultText.innerHTML = "🤖 Máquina venceu!"
    } else {
        alert("Ocorreu um erro! Reinicie a página e tente novamente.")
    }

    placar(ganhador)
    

    resultText.parentElement.classList.remove('noGame');
    goBtn.setAttribute('disabled', '');
    restartBtn.removeAttribute('disabled');
    game.style.pointerEvents = "none"
}

function recomecar() {
    let opcoesJogador = document.querySelectorAll('#opcoesJogador .opcao');
    let opcoesMaquina = document.querySelectorAll('#opcoesInimigo .opcao');
    let resultText = document.getElementById("resultText");
    
    opcoesJogador.forEach((opt, index) => {
        opt.classList.remove("selecionado");
        opcoesMaquina[index].classList.remove("selecionado");
    });
    
    resultText.parentElement.classList.add('noGame');
    resultText.innerHTML = "🍃 Não houve jogo ainda..."
    game.style.pointerEvents = ""
}

function placar(ganhador) {
    let placar = document.getElementById('placar')

    if (ganhador == "jogador") {
        vitoriasJogador++;
    } else if (ganhador == "maquina") {
        vitoriasMaquina++;
    }

    placar.innerHTML = `${vitoriasJogador} - ${vitoriasMaquina}`

    twemoji.parse(document.querySelector('*'), {
        folder: 'svg',
        ext: '.svg',
        base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/'
    });
}

document.addEventListener("DOMContentLoaded", () => {
    escolherJogada();
})