/*  Arquivo com as variáveis e funções necessárias em javascript para o desenvolvimento do jogo forca.
    Aluno: Jefferson Silva Lopes   
    Data: 20/06/2021
*/
alert("Você tem 7 tentativas para encontrar a palavra certa. Boa sorte!");
var Letras;
var palavra_secreta;
var Banco_de_palavras;
window.onload = function start(){  //chama a funcão quando a janela e carregada
    var teclado = document.getElementById("teclado");
    var palavrachave = document.getElementById("palavrachave");
    var i;

    palavrachave.style.color = "red";
    Banco_de_palavras = ['sistema', 'desenvolvimento', 'progamacao', 'variavel',
        'computacao', 'informacao', 'redes', 'web', 'hardware',
        'internet', 'javascript', 'java', 'html', 'arquitetura', 'seguranca', 'objeto', 'paradigma', 
        'qualidade', 'instituicao', 'faculdade', 'computador', 'android','linux', 'programa', 'software'];
        
    var rand = Math.floor(Math.random() * Banco_de_palavras.length);
    palavra_secreta = Banco_de_palavras[rand].toUpperCase().split("");

    for(i=0; i<palavra_secreta.length; i++){ //Exibe um bloco vazio para cada letra da palavra secreta
        var escondido = "style='visibility:hidden;'";
        palavrachave.innerHTML += "<div id='cor' class='group key'><div class= 'group char' " + escondido + " id='ltr" + i + "'>" + palavra_secreta[i] + "</char><cor";
       // document.getElementById("ltr"+i).style = "justify content"
    }

    //Gerador do Teclado
    letras = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'W', 'Y', 'Z');

        for(i = 0; i < letras.length; i++){
            var lString = "Chute('" + letras[i] + "')";
            var idtecla = "id='" + letras[i] + "'";
            teclado.innerHTML += "<button class='tecla' " + idtecla + " onclick=" + lString + ">" + letras[i] + "</button>";
        }
};


var fim_de_jogo = false;    //Confirma se o jogo acabou ou não.
var valid = false;   //Serve para validar se não ouveram acertos na iteração.
var erros = 0;  //Contador de erros
var acertos = 0;    //Contador de acertos.

function Perdeu(){
    document.getElementById("resultado").innerHTML = "<div id='win'>VOCÊ PERDEU!</div>";
    alert("Você foi enforcado! as letras que preenchiam as lacunas e formavam a palavra eram: " + palavra_secreta);
    alert("Deseja jogar novamente? Se sim, clique no botão 'novo jogo' ou feche essa página para sair! ");
    document.getElementById("again").innerHTML = "<button onclick='window.location.reload()'>Novo Jogo</button>";
    fim_de_jogo = true;
}


function Ganhou(){
    document.getElementById("resultado").innerHTML = "<div id='win'>VOCÊ GANHOU!</div>";
    alert("Parabéns, você se salvou!");
    alert("Deseja jogar novamente? Se sim, clique no botão 'novo jogo' ou feche essa página para sair! ");
    document.getElementById("again").innerHTML = "<button onclick='window.location.reload()'>Novo Jogo</button>";
    
    fim_de_jogo = true;
}

function Again(){
    history.go(0);
}

function Chute(ltr){
    //Verifica se o jogo acabou "Se o Jogo Não tiver acabado".             
    if(fim_de_jogo == false){   
        //Procura pela letra clickada e muda a cor do background do botão
        for(var j = 0; j < palavra_secreta.length; j++){
            if((ltr == palavra_secreta[j])&&(erros < 7)){
                var idltr = "ltr" + j;
                document.getElementById(idltr).style.visibility = "visible";
                document.getElementById(idltr).style.color = "green";
                document.getElementById(ltr).style.backgroundColor = "green";
                acertos+=1;
                valid = true;
                
            };
        };
        //Confere fora da Iteração se a letra esta errada (linha: 58-61).
        if((valid == false)&&(erros <= 7)){
            document.getElementById(ltr).style.backgroundColor = "red";
            erros+=1;
        }; if((valid == false)&&(erros >= 7)){   //Confere se o imite de erros foi ultrapassado.
            Perdeu()
        }else if(acertos == palavra_secreta.length){    //Confere se todas as letras ja foram exibidas.
            Ganhou();
        };
    };
    valid = false;
    document.getElementById("falhas").innerHTML = erros;
    document.getElementById(ltr).setAttribute('onclick','chute("")');
};
