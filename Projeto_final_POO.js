
class GameController {
    constructor() {
        this.player = new Player()
        this.match = new Match()
        this.letrasChutadas = new Set()
        this.montarPalavra;
    }

    gerarTema() {
        this.match.escolherUmTema()
    }

    gerarPalavra() {
        this.match.escolherUmaPalavra()
    }

    mostrarDica() {
        console.log(`A palavra tem ${this.match.palavra.length} letras.`)
        this.montarPalavra = new Array(this.match.palavra.length)
        this.montarPalavra.fill("_")
        console.log(this.montarPalavra.join(" "))
    }

    adivinharUmaLetra(letra) {
        if (this.player.totalTentativas > 0) {
            if (this.match.palavra.toLowerCase().includes(letra)) {
                for (let i = 0; i < this.match.palavra.length; i++) {
                    if (this.match.palavra[i] == letra) {
                        this.montarPalavra[i] = letra
                    }
                }
            } else {
                this.letrasChutadas.add(letra)
                console.log(`Sua palavra não contém a letra ${letra}.`)
                for (let i = 0; i < this.montarPalavra.length; i++) {
                    if (this.montarPalavra[i] === " ") {
                        this.montarPalavra[i] = "_"
                    }
                }
                this.player.totalTentativas--
            }
            console.log(`Tentativas restantes: ${this.player.totalTentativas}`)
            console.log(this.montarPalavra.join(" "))

        } else {
            console.log(`Suas tentativas acabaram`)
        }
    }


    adivinharPalavra(palavra) {
        if (this.player.totalTentativas > 0) {
            if (palavra.toLowerCase() == this.match.palavra.toLowerCase()) {
                this.player.pontos = 100
                console.log(`você acertou! A palavra era ${this.match.palavra}.`)
            } else {
                console.log(`Você errou! A palavra era ${this.match.palavra}. Mais sorte na próxima vez.`)
                this.player.totalTentativas = 0
            }
            this.player.totalTentativas--
        } else {
            console.log(`Você já esgotou suas tentativas e não pode mais tentar adivinhar a palavra.`)
        }
    }

    verPontos() {
        console.log(this.player.pontos)
    }

    resetarPartida() {
        this.player.totalTentativas = 6
        this.match.tema = ""
        this.match.palavra = ""

    }
}

class Player {
    constructor() {
        this.totalTentativas = 6;
        this.totalPontos = 0
    }

    get pontos() {
        return `Você tem ${this.totalPontos} pontos`
    }

    set pontos(pontos) {
        this.totalPontos += pontos
    }

}

class Match {
    constructor() {
        this.tema = ""
        this.palavra = ""
        this.opcao;
    }

    escolherUmTema() {
        this.opcao = ["frutas", "cidades", "carros", "animais"]
        const aleatorio2 = Math.floor(Math.random() * this.opcao.length)
        this.tema = this.opcao[aleatorio2]
        console.log(`O tema é: ${this.tema}`)

        const frutas = ["abacaxi", "banana", "morango", "uva", "laranja"]
        const cidades = ["diamantina", "florianopolis", "brusque", "aracaju"]
        const carros = ["honda", "fiat", "chevrolet", "toyota", "nissan"]
        const animais = ["gato", "cachorro", "lagarto", "cobra", "leao"]

        if (this.tema == "frutas") {
            this.tema = frutas
        }
        if (this.tema == "cidades") {
            this.tema = cidades
        }
        if (this.tema == "carros") {
            this.tema = carros
        }
        if (this.tema == "animais") {
            this.tema = animais
        }
    }

    escolherUmaPalavra() {
        const aleatorio = Math.floor(Math.random() * this.tema.length)
        this.palavra = this.tema[aleatorio]
    }
}

const prompt = require('prompt-sync')();
let opcao;
let partida = new GameController()

while (opcao != "0") {
    console.log(`
      MENU:
      1 - INICIAR NOVO JOGO
      2 - CONTINUAR JOGANDO
      3 - MOSTRAR MINHA PONTUAÇÃO
      0 - FINALIZAR JOGO`)
    opcao = prompt("Digite uma opção: ")
    let voltar = false
    let letra;
    let palavra;
  
    switch (opcao) {
      case "1":
        partida = new GameController()
      case "2":
        partida.resetarPartida()
        partida.gerarTema()
        partida.gerarPalavra()
        partida.mostrarDica()
        while (voltar == false) {
          console.log(`
                  1 - CHUTAR UMA LETRA
                  2 - CHUTAR UMA PALAVRA
                  3 - VOLTAR AO MENU`)
          opcao = prompt("Digite uma opção: ")
          switch (opcao) {
            case "1":
              letra = prompt("Digite uma letra: ")
              partida.adivinharUmaLetra(letra)
              break;
            case "2":
              palavra = prompt("Digite a palavra: ")
              partida.adivinharPalavra(palavra)
              break;
            case "3":
              voltar = true
              break;
            default:
              console.log("Digite uma opção válida!")
              break;
          }
        }
        break;
      case "3":
        partida.verPontos()
        while (voltar === false) {
          console.log(`
                  1 - VOLTAR AO MENU
                  `)
          opcao = prompt("Digite uma opção: ")
          switch (opcao) {
            case "1":
              voltar = true
              break;
            default:
              console.log("Digite uma opção válida!")
              break;
          }
        }
  
        break;
      case "0":
  
        break;
  
      default:
        console.log("Digite uma opção válida")
        break;
    }
  }