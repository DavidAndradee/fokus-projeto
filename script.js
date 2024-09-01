const html = document.querySelector('html')
const botao = document.querySelectorAll('.app__card-button')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const musicaFocoInput = document.querySelector('#alternar-musica')
const playOUpause = document.querySelector('#start-pause span')
const icon = document.querySelector('.app__card-primary-butto-icon')
const tempoTela = document.querySelector('#timer')

const musica = new Audio('/sons/emminem.mp3')
const comecar = new Audio('/sons/play.wav')
const pausar = new Audio('/sons/pause.mp3')
const finish = new Audio('/sons/beep.mp3')

const comecaPararBt = document.querySelector('#start-pause')

musica.loop = true

let tempoEmSec = 1500
let intervalo = null


musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

botao[0].addEventListener('click', () => {
    tempoEmSec = 1500
    alterarTema('foco')
    botao[0].classList.add('active')
})

botao[1].addEventListener('click', () => {
    tempoEmSec = 300
    alterarTema('descanso-curto')
    botao[1].classList.add('active')
})

botao[2].addEventListener('click', () => {
    tempoEmSec = 900
    alterarTema('descanso-longo')
    botao[2].classList.add('active')
})



function alterarTema(tema) {
    mostarTempo()
    botao.forEach(function (tema) {
        tema.classList.remove('active')
    })
    html.setAttribute('data-contexto', tema)
    banner.setAttribute('src', `/imagens/${tema}.png`)

    switch (tema) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case "descanso-curto":
            titulo.innerHTML = `Que tal da uma respirada,<br>
            <strong class="app__title-strong">descansa malandro.</strong>`
            break

        case "descanso-longo":
            titulo.innerHTML = `Hora de parar em malandro,<br>
            <strong class="app__title-strong">dá um tempo.</strong>`
            break

        default:
            break;
    }
}

const contagem = () => {
    if (tempoEmSec <= 0) {
        finish.play()
        zerar()
        return
    }
    tempoEmSec -= 1
    mostarTempo()
}

comecaPararBt.addEventListener('click', iniciar)

function iniciar() {
    if (intervalo) {
        pausar.play()
        zerar()
        return
    }

    comecar.play()
    intervalo = setInterval(contagem, 1000)
    playOUpause.textContent = "Pausar"
    icon.setAttribute('src', `/imagens/pause.png`)

}

function zerar() {
    clearInterval(intervalo)
    playOUpause.textContent = "Começar"
    icon.setAttribute('src', `/imagens/play_arrow.png`)
    intervalo = null
}

function mostarTempo() {
    const time = new Date(tempoEmSec * 1000)
    const formatTime = time.toLocaleTimeString('pt-Br', {minute:'2-digit', second:'2-digit'})
    tempoTela.innerHTML = `${formatTime}`
}

mostarTempo()

