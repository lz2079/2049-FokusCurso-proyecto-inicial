const html = document.querySelector("html");
const botonCorto = document.querySelector(".app__card-button--corto");
const botonEnfoque = document.querySelector(".app__card-button--enfoque");
const botonLargo = document.querySelector(".app__card-button--largo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botones = document.querySelectorAll(".app__card-button");
const inputEnfoqueMusica = document.querySelector("#alternar-musica");
const botonIniciarPausar = document.querySelector("#start-pause");
const textoIniciarPausar = document.querySelector("#start-pause span");
const iconoIniciarPausar = document.querySelector(".app__card-primary-butto-icon");
const tiempoEnPantalla = document.querySelector("#timer");

const musica = new Audio("./sonidos/luna-rise-part-one.mp3");
// 1. Crear instancias de Audio para cada sonido
const audioPlay = new Audio('./sonidos/play.wav'); // Nota: el archivo es .wav según tu listado
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3');


let tiempoTranscurridoEnSegundos = 1500; // 25 minutos en segundos
let idIntervalo = null

musica.loop = true;

inputEnfoqueMusica.addEventListener("change", () => {
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

botonCorto.addEventListener("click", () => {
    tiempoTranscurridoEnSegundos = 300; // 5 minutos en segundos
    cambiarContexto("descanso-corto");
    botonCorto.classList.add("active");
})

botonEnfoque.addEventListener("click", () => {
    tiempoTranscurridoEnSegundos = 1500; // 25 minutos en segundos
    cambiarContexto("enfoque");
    botonEnfoque.classList.add("active");

})

botonLargo.addEventListener("click", () => {
    tiempoTranscurridoEnSegundos = 900; // 15 minutos en segundos
    cambiarContexto("descanso-largo");
    botonLargo.classList.add("active");
})

function cambiarContexto(contexto) {

    mostrarTiempo()
    botones.forEach(function(contexto){
        contexto.classList.remove("active");
    })

    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src" , `./imagenes/${contexto}.png`)

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
                `
            break;
        case "descanso-corto":
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro? 
                <strong class="app__title-strong">¡Haz una pausa corta!</strong>
                `
            break;
        case "descanso-largo":
            titulo.innerHTML = `
            Hora de volver a la superficie
                <strong class="app__title-strong">Haz una pausa larga.</strong>
                `
        default:
            break;
          
    }

}

const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos <= 0){
        audioTiempoFinalizado.play();
        alert("Tiempo final")
        reiniciar()
        return
    }
    textoIniciarPausar.textContent = "Pausar"
    iconoIniciarPausar.setAttribute("src", `./imagenes/pause.png`)
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo()

}

botonIniciarPausar.addEventListener("click", iniciarPausar)

function iniciarPausar(){
    if(idIntervalo){
        // Si ya hay un intervalo en ejecución (pausar)
        audioPausa.play();
        
        reiniciar()
        return
    }
    // Si no hay intervalo (iniciar)
  audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000)

}

function reiniciar(){
    clearInterval(idIntervalo)
    textoIniciarPausar.textContent = "Comenzar"
    iconoIniciarPausar.setAttribute("src", `./imagenes/play_arrow.png`);
    idIntervalo = null

}

function mostrarTiempo() {
    const tiempo = new Date (tiempoTranscurridoEnSegundos * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString("es-CL", {minute: "2-digit", second: "2-digit"})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`

}

mostrarTiempo()