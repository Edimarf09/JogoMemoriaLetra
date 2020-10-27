var criaCartas = "";
var containerCartas = document.getElementById("container");
var modalFimJogo = document.getElementById("modalGameOver");
var movimentosTxt = document.getElementById("movimentos");
var movimentosInt = 0;
var numeroSorteados = [];
var cartaVirada = [];
var controleLaco;
var contadorVetor;
var acertos = 0;

window.onload = function criarCartasInicio(){
    criaCartasJogo();
}

function criaCartasJogo() {
    containerCartas.innerHTML = '';
    //gerar o vetor com as posições aleatorias
    criaCartas = "";
    controleLaco = 1;
    contadorVetor = 0;
    numeroSorteados = [];
    cartaVirada = [];
    acertos = 0;
    movimentosInt = 0;
    movimentosTxt.setAttribute('value','0');
    while(controleLaco == 1){
        if(numeroSorteados.length != 14){//verifica se o vetor ja preencheu todos os espaços
            let numeroAleatorio = Math.floor(Math.random() * 14 +1);//sorteia um numero aleatorio entre 1 - 14
            if(verificaNumeroVetor(numeroSorteados,numeroAleatorio) == 0){//verifica se esse numero esta no vetor
                numeroSorteados[contadorVetor] = numeroAleatorio;
                contadorVetor++;
            }
        } else {
            controleLaco = 0;
        }
    }
    //atribuir as posições aleatorias as divs de cartas
    for(contadorVetor = 0; contadorVetor < 14; contadorVetor++){
        criaCartas += `<div class="card" id="card${numeroSorteados[contadorVetor]}" > <div class="face back"> </div> <div class="face front" style="background: url(images/${numeroSorteados[contadorVetor]}.jpg);"> </div> </div>`;
    }
    containerCartas.innerHTML = criaCartas;
    for(let u = 0; u < 7; u++){//define a imagem de cada cartinha
        let cartinha1 = document.getElementById(`card${u+1}`);
        cartinha1.children[1].setAttribute('id',`${u}`);
        let cartinha2 = document.getElementById(`card${u+8}`);
        cartinha2.children[1].setAttribute('id',`${u}`);
    }
    for(let i = 0; i < 14; i++){
        var card = document.getElementById(`card${i+1}`);
        card.addEventListener("click",flipCard,false);
    }
}

function flipCard(){
    if(cartaVirada.length < 2){
        var faces = this.getElementsByClassName("face");
        if(faces[0].classList.length > 2){
            return;
        }
        faces[0].classList.toggle("flipped");
        faces[1].classList.toggle("flipped");
        cartaVirada.push(this);
        if(cartaVirada.length === 2){
            if(cartaVirada[0].childNodes[3].id === cartaVirada[1].childNodes[3].id){//caso o jogador acerte as cartas
                cartaVirada[0].childNodes[1].classList.toggle("match");
                cartaVirada[0].childNodes[3].classList.toggle("match");
                cartaVirada[1].childNodes[1].classList.toggle("match");
                cartaVirada[1].childNodes[3].classList.toggle("match");//borda verde
                acertos++;
                cartaVirada = [];
                movimentosInt++;
                movimentosTxt.setAttribute('value',`${movimentosInt}`);
                if(acertos == 7){//se acertar todas os conjuntos acaba o jogo
                    fimJogo();
                }
            }
        }
    } else {//caso as cartas não sejam iguais ???????????????
        cartaVirada[0].childNodes[1].classList.toggle("flipped");
        cartaVirada[0].childNodes[3].classList.toggle("flipped");
        cartaVirada[1].childNodes[1].classList.toggle("flipped");
        cartaVirada[1].childNodes[3].classList.toggle("flipped");
        movimentosInt++;
        movimentosTxt.setAttribute('value',`${movimentosInt}`);
        cartaVirada = [];
    }
}

function fimJogo(){
    modalFimJogo.removeAttribute('hidden');
}

function verificaNumeroVetor(vetor,numero){
    let tamanhoVetor = vetor.length;
    for(let i = 0; i < tamanhoVetor; i++){
        if(vetor[i] == numero){//se o vetor na posição i é igual ao numero ele retorna positivo e sai da função
            return 1;
        }
    }
    return 0;// se o numero não estiver no vetor ele retorna falso
}

function reiniciar(){
    containerCartas.innerHTML = "";
    criaCartasJogo();
}

function reiniciarFimJogo(){
    containerCartas.innerHTML = "";
    modalFimJogo.setAttribute('hidden',true);
    criaCartasJogo();
}