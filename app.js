let listaDeNumerosSorteador = [];
let numerolimite = 100;
let mensagemDonúmeroDeEscolha = `Escolha um número de 1 a ${numerolimite}`;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
exibirTexto('h1', 'Jogo do número secreto');
exibirTexto('p', mensagemDonúmeroDeEscolha);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

  if (chute == numeroSecreto) {
        exibirTexto('H1', 'acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'Tentativa'
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
       if (chute > numeroSecreto) {
            exibirTexto('p', 'O número é menor');
    } else {
        exibirTexto('p', 'O número é maior');
      }

      tentativas++;
      limparCampo();
   }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numerolimite + 1);
    let quantidadeDeElementosNalista = listaDeNumerosSorteador.length;

    if (quantidadeDeElementosNalista ==numerolimite) { 
        listaDeNumerosSorteador = [];
    }

    if (listaDeNumerosSorteador.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteador.push(numeroEscolhido);
        console.log(listaDeNumerosSorteador);
        return numeroEscolhido
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',
        true)
}